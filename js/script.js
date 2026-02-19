document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION KIZUNA ---
    const ENABLE_SUPER_BOSS = false; // Mettre à false pour désactiver le bouton Super Boss

    // Vous pouvez modifier cette liste pour changer les affinités et l'ordre des équipes.
    // Types disponibles : 'STR', 'DEX', 'QCK', 'PSY', 'INT'
    const KIZUNA_CONFIG = [
        // Boss Normaux
        { type: 'STR', label: 'Boss vs STR', active: true },
        { type: 'DEX', label: 'Boss vs DEX', active: false },
        { type: 'QCK', label: 'Boss vs QCK', active: false },
        { type: 'PSY', label: 'Boss vs PSY', active: false },
        { type: 'INT', label: 'Boss vs INT', active: true },
        // Super Boss
        { type: 'STR', label: 'Super Boss vs STR', isSuper: true, active: false },
        { type: 'DEX', label: 'Super Boss vs DEX', isSuper: true, active: false },
        { type: 'QCK', label: 'Super Boss vs QCK', isSuper: true, active: false },
        { type: 'PSY', label: 'Super Boss vs PSY', isSuper: true, active: false },
        { type: 'INT', label: 'Super Boss vs INT', isSuper: true, active: false },
    ];

    // Génération dynamique des équipes dans le HTML
    const teamBuilder = document.getElementById('team-builder');

    // --- GESTION DRAG & DROP ---
    let draggedSlot = null;

    function handleDragStart(e) {
        if (!this.classList.contains('filled')) {
            e.preventDefault();
            return;
        }
        draggedSlot = this;
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragOver(e) {
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('drag-over');
    }

    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleDragEnd(e) {
        document.querySelectorAll('.team-slot').forEach(slot => slot.classList.remove('drag-over'));
    }

    function handleDrop(e) {
        e.stopPropagation();
        this.classList.remove('drag-over');

        if (draggedSlot !== this) {
            const srcHTML = draggedSlot.innerHTML;
            const tgtHTML = this.innerHTML;
            const srcClass = draggedSlot.className;
            const tgtClass = this.className;

            draggedSlot.innerHTML = tgtHTML;
            this.innerHTML = srcHTML;
            draggedSlot.className = tgtClass;
            this.className = srcClass;
        }
        return false;
    }

    if (teamBuilder) {
        teamBuilder.innerHTML = ''; // Nettoyer le contenu existant
        
        KIZUNA_CONFIG.forEach(config => {
            if (!config.active) return;

            const container = document.createElement('div');
            container.className = `team-container type-${config.type} ${config.isSuper ? 'super-boss' : ''}`;
            
            // Bouton pour vider l'équipe
            const clearBtn = document.createElement('button');
            clearBtn.className = 'clear-team-btn';
            clearBtn.textContent = 'VIDER';
            clearBtn.title = "Vider l'équipe";
            clearBtn.onclick = () => {
                teamToClear = container;
                confirmModal.style.display = 'block';
            };
            container.appendChild(clearBtn);

            // Slot Bateau (Haut Gauche)
            const shipSlot = document.createElement('div');
            shipSlot.className = 'ship-slot';
            shipSlot.title = "Sélectionner un bateau";
            shipSlot.onclick = () => {
                currentSlot = shipSlot;
                isShipSlot = true; // Indicateur pour savoir qu'on choisit un bateau
                searchInput.value = '';
                modalTitle.textContent = "Choisir un Bateau";
                searchInput.style.display = 'none';
                if (filterFolder) filterFolder.style.display = 'none';
                renderModalCharacters();
                modal.style.display = 'block';
            };
            container.appendChild(shipSlot);

            const title = document.createElement('h3');
            title.innerHTML = `${config.label} <span class="info-icon">ℹ️</span>`;
            title.classList.add('boss-title-clickable');
            title.onclick = () => openBossInfo(config);
            container.appendChild(title);
            
            const slotsDiv = document.createElement('div');
            slotsDiv.className = 'team-slots';
            
            // 6 slots par équipe
            for (let i = 0; i < 6; i++) {
                const slot = document.createElement('div');
                slot.className = 'team-slot';
                
                // Ajout des événements Drag & Drop
                slot.setAttribute('draggable', true);
                slot.addEventListener('dragstart', handleDragStart);
                slot.addEventListener('dragover', handleDragOver);
                slot.addEventListener('drop', handleDrop);
                slot.addEventListener('dragenter', handleDragEnter);
                slot.addEventListener('dragleave', handleDragLeave);
                slot.addEventListener('dragend', handleDragEnd);

                slotsDiv.appendChild(slot);
            }
            
            container.appendChild(slotsDiv);
            teamBuilder.appendChild(container);
        });
    }

    // --- GESTION DE L'AFFICHAGE (BOSS / SUPER BOSS) ---
    const btnBoss = document.getElementById('btn-boss');
    const btnSuper = document.getElementById('btn-super');

    function setView(view) {
        if (!teamBuilder) return;
        
        // Change la classe du conteneur pour gérer l'affichage via CSS
        teamBuilder.className = `view-${view}`;
        
        // Gestion de l'état actif des boutons
        if (view === 'boss') {
            btnBoss.classList.add('active');
            btnSuper.classList.remove('active');
        } else {
            btnBoss.classList.remove('active');
            btnSuper.classList.add('active');
        }
    }

    if (btnBoss && btnSuper) {
        btnBoss.addEventListener('click', () => setView('boss'));
        
        if (ENABLE_SUPER_BOSS) {
            btnSuper.addEventListener('click', () => setView('super'));
        } else {
            btnSuper.disabled = true;
            btnSuper.style.opacity = '0.5';
            btnSuper.style.cursor = 'not-allowed';
        }
        
        // Vue par défaut
        setView('boss');
    }

    let allShips = typeof ships !== 'undefined' ? ships : []; // Chargement des bateaux depuis ship.js
    let allCharacters = [];
    let isShipSlot = false; // Variable pour savoir si on modifie un slot de bateau
    let isLoading = true; // État de chargement
    let loadError = null; // État d'erreur
    const teamSlots = document.querySelectorAll('.team-slot'); // Sélection après génération
    const modal = document.getElementById('character-modal');
    const modalTitle = modal.querySelector('h2');
    const modalGrid = document.getElementById('modal-character-grid');
    const closeBtn = document.querySelector('.close-modal');
    const searchInput = document.getElementById('search-id');
    const removeBtn = document.getElementById('btn-remove-char');
    const cancelBtn = document.getElementById('btn-cancel-modal');
    const filterFolder = document.querySelector('.filter-folder');

    // --- GESTION MODALE CONFIRMATION VIDER ---
    let teamToClear = null;
    const confirmModal = document.createElement('div');
    confirmModal.className = 'modal';
    confirmModal.innerHTML = `
        <div class="modal-content" style="max-width: 400px; text-align: center;">
            <h3>Vider l'équipe ?</h3>
            <p>Voulez-vous vraiment retirer tous les personnages de cette équipe ?</p>
            <div class="modal-actions">
                <button id="btn-confirm-yes" class="action-btn remove-btn">Vider</button>
                <button id="btn-confirm-no" class="action-btn cancel-btn">Annuler</button>
            </div>
        </div>
    `;
    document.body.appendChild(confirmModal);

    document.getElementById('btn-confirm-yes').addEventListener('click', () => {
        if (teamToClear) {
            const slots = teamToClear.querySelectorAll('.team-slot');
            slots.forEach(slot => {
                slot.innerHTML = '';
                slot.classList.remove('filled');
            });

            const shipSlot = teamToClear.querySelector('.ship-slot');
            if (shipSlot) {
                shipSlot.innerHTML = '';
            }
        }
        confirmModal.style.display = 'none';
        teamToClear = null;
    });

    document.getElementById('btn-confirm-no').addEventListener('click', () => {
        confirmModal.style.display = 'none';
        teamToClear = null;
    });

    // --- GESTION MODALE INFOS BOSS ---
    const bossInfoModal = document.getElementById('boss-info-modal');
    const closeBossInfoBtn = document.getElementById('close-boss-info');
    const bossInfoTitle = document.getElementById('boss-info-title');
    const bossInfoContent = document.getElementById('boss-info-content');

    // --- CONFIGURATION DES ICÔNES ---
    // Associe un mot-clé à une image.
    // Le script détectera ces mots dans le texte et ajoutera l'icône devant.
    const ICON_MAP = {
        // TYPES (Icons/types/)
        'STR': 'Icons/types/STR.png',
        'DEX': 'Icons/types/DEX.png',
        'QCK': 'Icons/types/QCK.png',
        'PSY': 'Icons/types/PSY.png',
        'INT': 'Icons/types/INT.png',
        
        // CLASSES (Icons/Classes/)
        'Slasher': 'Icons/Classes/Slasher.png', 'Sabreur': 'Icons/Classes/Slasher.png',
        'Striker': 'Icons/Classes/Striker.png', 'Ravageur': 'Icons/Classes/Striker.png',
        'Cerebral': 'Icons/Classes/Cerebral.png', 'Intellectuel': 'Icons/Classes/Cerebral.png',
        'FreeSpirit': 'Icons/Classes/FreeSpirit.png', 'Libre': 'Icons/Classes/FreeSpirit.png',
        'Powerhouse': 'Icons/Classes/Powerhouse.png', 'Tenace': 'Icons/Classes/Powerhouse.png',
        'Shooter': 'Icons/Classes/Shooter.png', 'Tireur': 'Icons/Classes/Shooter.png',
        'Fighter': 'Icons/Classes/Fighter.png', 'Cogneur': 'Icons/Classes/Fighter.png',
        'Driven': 'Icons/Classes/Driven.png', 'Ambitieux': 'Icons/Classes/Driven.png',

        // EFFETS (Icons/effects/) - Ajoutez vos propres effets ici
        'Spe CD': 'Icons/effects/Spe CD.png',
        'Switch CD': 'Icons/effects/Switch CD.png',
        'VS CD': 'Icons/effects/VS CD.png',
        'Retraite': 'Icons/effects/Retraite.png',
        'ATK Chain Lock': 'Icons/effects/ATK Chain Lock.png',
        'Normal Only': 'Icons/effects/Normal Only.png',
        'Berserker': 'Icons/effects/Berserker.png',
        'Def UP': 'Icons/effects/Def UP.png',
        'Interruption': 'Icons/effects/Interruption.png',
        'Actions Vaincu': 'Icons/effects/Actions Vaincu.png',
        'Etat Initial': 'Icons/effects/Etat Initial.png',
        'Actions Preventives': 'Icons/effects/Actions Preventives.png',
        'Clear': 'Icons/effects/Clear.png',
        'Spe Retour': 'Icons/effects/Spe Retour.png',
        'Heal': 'Icons/effects/Heal.png',
        'Damage': 'Icons/effects/Damage.png',
        'Immunités': 'Icons/effects/Immunités.png',
        'Immunité Death': 'Icons/effects/Immunité Death.png',
        'Résistance dégats': 'Icons/effects/Résistance dégats.png',
        'Chain Down': 'Icons/effects/Chain Down.png',
        'Intimidate': 'Icons/effects/Intimidate.png',
        'ATK Down': 'Icons/effects/ATK Down.png',
        'Resilience': 'Icons/effects/Resilience.png',
        'Poison': 'Icons/effects/Poison.png',
        'Dommage +': 'Icons/effects/Dommage +.png',
        'Berserker': 'Icons/effects/Berserker.png',
        'Immunité Retard': 'Icons/effects/Immunité Retard.png',
        'Paralysie': 'Icons/effects/Paralysie.png',
        'Treshold': 'Icons/effects/Treshold.png',
        'Pain': 'Icons/effects/Pain.png',
        'Cercle Poison': 'Icons/effects/Cercle Poison.png',
        'WA': 'Icons/effects/WA.png',
        'G': 'Icons/effects/G.png',
        'TND': 'Icons/effects/TND.png',
        'RCV': 'Icons/effects/RCV.png',
        'SEMLA': 'Icons/effects/SEMLA.png',
        'Arc-en-ciel': 'Icons/effects/Arc-en-ciel.png',
        'BLK': 'Icons/effects/BLK.png',
        'EMP': 'Icons/effects/EMP.png',
        'Bomb': 'Icons/effects/Bomb.png',
        '': 'Icons/effects/.png',
        '': 'Icons/effects/.png',
        '': 'Icons/effects/.png',
        '': 'Icons/effects/.png',
        '': 'Icons/effects/.png',
        '': 'Icons/effects/.png',
        '': 'Icons/effects/.png',
        '': 'Icons/effects/.png',
    };

    function formatBossText(text) {
        if (!text) return '';
        let formatted = text.replace(/\n/g, '<br>');

        // Trie les clés par longueur (du plus long au plus court) pour éviter les conflits de remplacement
        const keys = Object.keys(ICON_MAP).sort((a, b) => b.length - a.length);

        keys.forEach(key => {
            const iconPath = ICON_MAP[key];
            // Echappement des caractères spéciaux pour le regex
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            // Regex qui ne cible QUE le format [Key] pour un contrôle total.
            // 1. (<[^>]+>) : Capture les balises HTML existantes pour ne pas les modifier.
            // 2. (\[...\]) : Capture le format [Key] pour le remplacement.
            const regex = new RegExp(`(<[^>]+>)|(\\[${escapedKey}\\])`, 'gi');
            
            formatted = formatted.replace(regex, (match, tag, bracketMatch) => {
                if (tag) return tag; // On ignore les balises HTML

                if (bracketMatch) {
                    // Format [Key] : On retourne uniquement l'icône
                    return `<img src="${iconPath}" class="inline-icon" alt="${key}" title="${key}">`;
                }
                
                return match;
            });
        });

        return formatted;
    }

    window.openBossInfo = function(config) {
        const key = (config.isSuper ? 'Super_' : '') + config.type;
        const stats = window.bossStats ? window.bossStats[key] : null;
 
        // Réinitialise les classes et applique la couleur du type au titre
        bossInfoTitle.className = `type-${config.type}`;
 
        // Construit le titre avec l'icône d'affinité
        const iconPath = ICON_MAP[config.type];
        let titleHtml = config.label;
        if (iconPath) {
            titleHtml += ` <img src="${iconPath}" class="inline-icon" alt="${config.type}" title="${config.type}">`;
        }
        bossInfoTitle.innerHTML = titleHtml;
 
        bossInfoContent.innerHTML = '';
        if (stats) {
            const table = document.createElement('table');
            table.className = 'boss-stats-table';

            for (const [prop, value] of Object.entries(stats)) {
                if (!value) continue; // N'affiche que les champs remplis

                const tr = document.createElement('tr');
                const th = document.createElement('th');
                th.textContent = prop;
                tr.appendChild(th);

                const td = document.createElement('td');

                // Traitement spécial pour afficher les images des personnages recommandés
                if (prop === "Personnages Recommandés") {
                    const ids = value.match(/\d+/g); // Extrait tous les nombres (IDs) de la chaîne
                    if (ids) {
                        const container = document.createElement('div');
                        container.className = 'character-grid'; // Réutilisation du style
                        container.style.justifyContent = 'flex-start'; // Aligner à gauche

                        ids.forEach(id => {
                            const char = allCharacters.find(c => c.id === id);
                            const sources = getThumbSources(id);

                            const img = document.createElement('img');
                            img.src = sources.primary;
                            img.alt = char ? char.name : `ID: ${id}`;
                            img.title = char ? `${char.name} (ID: ${id})` : `ID: ${id}`;
                            img.loading = 'lazy';

                            // Gestion des erreurs de chargement d'image
                            img.onerror = function() {
                                if (this.src === sources.primary) {
                                    this.src = sources.fallback;
                                } else {
                                    this.style.opacity = '0.3';
                                    this.style.backgroundColor = '#ccc';
                                    this.onerror = null;
                                }
                            };
                            container.appendChild(img);
                        });
                        td.appendChild(container);
                    } else {
                        td.innerHTML = formatBossText(value); // Fallback si aucun ID n'est trouvé
                    }
                } else {
                    // Traitement normal pour les autres propriétés
                    td.innerHTML = formatBossText(value);
                }
                tr.appendChild(td);
                table.appendChild(tr);
            }
            bossInfoContent.appendChild(table);
        } else {
            bossInfoContent.innerHTML = '<p>Aucune information disponible pour ce boss.</p>';
        }

        bossInfoModal.style.display = 'block';
    };

    if (closeBossInfoBtn) {
        closeBossInfoBtn.addEventListener('click', () => {
            bossInfoModal.style.display = 'none';
        });
    }

    let currentSlot = null;

    // Fonction utilitaire pour éviter les ralentissements (Debounce)
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Configuration des URLs d'images (Formule fournie)
    const THUMB_PRIMARY = "https://cdn.jsdelivr.net/gh/2Shankz/optc-db.github.io@master/api/images/thumbnail/glo";
    const THUMB_FALLBACK = "https://cdn.jsdelivr.net/gh/2Shankz/optc-db.github.io@master/api/images/thumbnail/jap";
    const THUMB_JAP_PRIMARY_IDS = new Set(["2792", "2794"]);

    function thumbUrl(id, base = THUMB_PRIMARY) {
        const id4 = String(id).padStart(4, "0");
        return `${base}/${id4[0]}/${id4[1]}00/${id4}.png`;
    }

    function getThumbSources(id) {
        const key = String(id || "");
        if (THUMB_JAP_PRIMARY_IDS.has(key)) {
            return {
                primary: thumbUrl(key, THUMB_FALLBACK),
                fallback: thumbUrl(key, THUMB_PRIMARY)
            };
        }
        return {
            primary: thumbUrl(key, THUMB_PRIMARY),
            fallback: thumbUrl(key, THUMB_FALLBACK)
        };
    }

    // Chargement des données depuis le dépôt GitHub (Mise à jour automatique)
    const UNITS_URL = 'https://raw.githubusercontent.com/2Shankz/optc-db.github.io/master/common/data/units.js';

    fetch(UNITS_URL)
        .then(response => {
            if (!response.ok) throw new Error("Erreur réseau : " + response.status);
            return response.text();
        })
        .then(scriptContent => {
            // Exécution du script récupéré pour définir window.units
            try {
                window.eval(scriptContent);
            } catch (e) {
                throw new Error("Erreur d'exécution du script units.js : " + e.message);
            }

            if (window.units) {
                try {
                    // Conversion de l'objet units en tableau
                    allCharacters = Object.entries(window.units).map(([id, unitData]) => {
                        // Vérification que les données existent
                        if (!unitData) return null;
                        // On ignore les IDs non numériques
                        if (isNaN(parseInt(id))) return null;

                        // Extraction des données (Support format Tableau et Objet)
                        const name = unitData.name || unitData[0];
                        const type = unitData.type || unitData[1];
                        let classes = [];
                        
                        if (Array.isArray(unitData)) {
                            if (unitData[2]) classes.push(unitData[2]);
                            if (unitData[3]) classes.push(unitData[3]);
                        } else if (unitData.class) {
                            if (Array.isArray(unitData.class)) classes = unitData.class;
                            else classes.push(unitData.class);
                        }

                        return {
                            id: id,
                            name: name,
                            type: type,
                            classes: classes
                        };
                    }).filter(u => u !== null);
                    
                    // OPTIMISATION : On trie la liste une seule fois au chargement
                    allCharacters.sort((a, b) => {
                        const idA = parseInt(a.id);
                        const idB = parseInt(b.id);

                        // Exception pour les IDs 4986 à 4996 (les mettre à la fin)
                        const isAExcluded = idA >= 4986 && idA <= 4996;
                        const isBExcluded = idB >= 4986 && idB <= 4996;

                        if (isAExcluded && !isBExcluded) return 1;
                        if (!isAExcluded && isBExcluded) return -1;

                        return idB - idA;
                    });

                    console.log(`Base de données chargée : ${allCharacters.length} personnages.`);
                    isLoading = false;
                    
                    // Si la modale est déjà ouverte, on rafraîchit l'affichage
                    if (modal.style.display === 'block') {
                        renderModalCharacters();
                    }
                } catch (e) {
                    throw new Error("Erreur lors du traitement des données : " + e.message);
                }
            } else {
                throw new Error("Le fichier chargé ne contient pas window.units.");
            }
        })
        .catch(err => {
            console.error(err);
            loadError = "Impossible de charger la base de données : " + err.message;
            isLoading = false;
            if (modal.style.display === 'block') {
                renderModalCharacters();
            }
        });

    // Gestion des clics sur les filtres
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // On s'assure qu'un slot est bien en cours d'édition
            if (!currentSlot) return;
            const teamContainer = currentSlot.closest('.team-container');
            if (!teamContainer) return;

            // On récupère les filtres spécifiques à l'équipe
            if (!teamContainer.filters) teamContainer.filters = { type: [], class: [] };
            const activeFilters = teamContainer.filters;

            const filterType = this.dataset.filterType; // 'type' ou 'class'
            const value = this.dataset.value;
            const list = activeFilters[filterType];

            if (list.includes(value)) {
                // Désactiver si déjà actif
                activeFilters[filterType] = list.filter(item => item !== value);
                this.classList.remove('active');
            } else {
                // Si 3 filtres sont déjà sélectionnés, on retire le plus ancien (FIFO)
                if (list.length >= 3) {
                    const removedValue = list.shift(); // Retire le premier élément du tableau
                    // Trouver et désactiver visuellement le bouton correspondant
                    const btnToRemove = document.querySelector(`.filter-btn[data-filter-type="${filterType}"][data-value="${removedValue}"]`);
                    if (btnToRemove) btnToRemove.classList.remove('active');
                }
                // Ajouter le nouveau filtre
                list.push(value);
                this.classList.add('active');
            }
            // Relancer l'affichage avec la recherche actuelle
            renderModalCharacters(searchInput.value);
        });
    });

    // Bouton de réinitialisation des filtres
    const resetFiltersBtn = document.getElementById('btn-reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            if (currentSlot) {
                const teamContainer = currentSlot.closest('.team-container');
                if (teamContainer) {
                    teamContainer.filters = { type: [], class: [] };
                }
            }
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            renderModalCharacters(searchInput.value);
        });
    }

    // Fonction pour afficher les personnages dans la modale
    function renderModalCharacters(filterId = '') {
        modalGrid.innerHTML = '';
        const search = filterId.toLowerCase();

        // On récupère les filtres de l'équipe en cours d'édition
        let activeFilters = { type: [], class: [] }; // Filtres par défaut (vides)
        if (currentSlot && !isShipSlot) {
            const teamContainer = currentSlot.closest('.team-container');
            if (teamContainer && teamContainer.filters) {
                activeFilters = teamContainer.filters;
            }
        }

        // --- GESTION DES BATEAUX ---
        if (isShipSlot) {
            const filteredShips = allShips.filter(ship => {
                return ship.Recherche.toLowerCase().includes(search);
            });

            if (filteredShips.length === 0) {
                modalGrid.innerHTML = '<div style="padding:20px; text-align:center; width:100%;">Aucun bateau trouvé.</div>';
                return;
            }

            filteredShips.forEach(ship => {
                const img = document.createElement('img');
                img.loading = 'lazy';
                img.src = ship.image;
                img.alt = ship.name;
                img.title = ship.name;
                
                img.onclick = () => {
                    if (currentSlot) {
                        currentSlot.innerHTML = '';
                        const newImg = document.createElement('img');
                        newImg.src = img.src;
                        newImg.alt = img.alt;
                        currentSlot.appendChild(newImg);
                        modal.style.display = 'none';
                        currentSlot = null;
                    }
                };
                modalGrid.appendChild(img);
            });
            return; // On arrête ici pour ne pas afficher les persos
        }

        // Gestion des états (Chargement / Erreur) pour les personnages
        if (isLoading) {
            modalGrid.innerHTML = '<div style="padding:20px; text-align:center; width:100%;">Chargement des données en cours...<br>(Cela peut prendre quelques secondes)</div>';
            return;
        }

        if (loadError) {
            modalGrid.innerHTML = `<div style="padding:20px; text-align:center; color:red; width:100%;">Erreur : ${loadError}</div>`;
            return;
        }

        // --- GESTION DES PERSONNAGES ---

        // Préparation du filtrage d'équipe pour masquer les doublons
        let occupiedBaseIds = new Map(); // baseId -> slotIndex
        let currentSlotIndex = -1;

        if (currentSlot && currentSlot.parentElement) {
            const slots = Array.from(currentSlot.parentElement.children);
            currentSlotIndex = slots.indexOf(currentSlot);
            
            slots.forEach((slot, index) => {
                if (slot === currentSlot) return; // On ignore le slot en cours de modification
                const img = slot.querySelector('img');
                if (img && img.dataset.id) {
                    // On utilise l'ID de base (avant le tiret) pour la comparaison
                    const baseId = img.dataset.id.split('-')[0];
                    occupiedBaseIds.set(baseId, index);
                }
            });
        }

        // 1. Filtrer par ID OU par Nom (Le tri est déjà fait au chargement)
        const filteredChars = allCharacters.filter(char => {
                // Recherche dans l'ID ou le Nom
                const matchesSearch = char.id.includes(search) || (char.name && char.name.toLowerCase().includes(search));
                if (!matchesSearch) return false;

                // 2. Filtre Type
                if (activeFilters.type.length > 0 && !activeFilters.type.includes(char.type)) return false;

                // 3. Filtre Classe
                if (activeFilters.class.length > 0) {
                    // Vérifie si l'une des classes du perso correspond à l'une des classes sélectionnées
                    // Note: Les données utilisent "Free Spirit" avec espace, les boutons aussi.
                    if (!char.classes || !char.classes.some(c => activeFilters.class.includes(c))) return false;
                }

                // Filtrage des doublons : Si le perso est déjà dans l'équipe
                // On le masque, SAUF si c'est pour faire une paire de capitaines (slots 0 et 1)
                const charBaseId = char.id.split('-')[0];
                
                if (occupiedBaseIds.has(charBaseId)) {
                    // Exception : Le slot 0 (Haut Gauche) accepte les doublons avec n'importe quel autre slot
                    if (currentSlotIndex === 0) return true;

                    const existingSlotIndex = occupiedBaseIds.get(charBaseId);
                    const isCaptainPair = (currentSlotIndex <= 1) && (existingSlotIndex <= 1);
                    
                    if (!isCaptainPair) {
                        return false; // Masquer le personnage
                    }
                }
                
                return true;
            });

        // 3. Afficher tous les résultats si une recherche est active, sinon limiter à 50 pour les performances
        // Si filterId est vide (ouverture de la modale), on limite. Si on cherche, on montre tout.
        const limitedChars = filterId ? filteredChars : filteredChars.slice(0, 50);

        if (limitedChars.length === 0) {
            modalGrid.innerHTML = '<div style="padding:20px; text-align:center; width:100%;">Aucun personnage trouvé.</div>';
            return;
        }

        limitedChars.forEach(char => {
            const img = document.createElement('img');
            img.loading = 'lazy'; // Chargement différé
            img.decoding = 'async'; // Décodage asynchrone

            img.alt = char.name;
            img.title = `${char.name} (ID: ${char.id})`; // Tooltip pour voir l'ID
            
            const sources = getThumbSources(char.id);

            img.onerror = function() {
                if (this.src === sources.primary) {
                    this.src = sources.fallback;
                } else {
                    this.style.opacity = '0.3';
                    this.style.backgroundColor = '#ccc';
                    this.onerror = null;
                }
            };

            img.src = sources.primary;
            img.dataset.id = char.id;

            img.addEventListener('click', () => {
                if (currentSlot) {
                    currentSlot.innerHTML = '';
                    const newImg = document.createElement('img');
                    newImg.src = img.src;
                    newImg.alt = img.alt;
                    newImg.dataset.id = char.id;
                    currentSlot.appendChild(newImg);
                    currentSlot.classList.add('filled');
                    
                    // Fermer la modale
                    modal.style.display = 'none';
                    currentSlot = null;
                }
            });

            modalGrid.appendChild(img);
        });
    }

    // 3. Gérer le clic sur les slots d'équipe
    teamSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            currentSlot = slot;
            isShipSlot = false; // On clique sur un slot perso
            searchInput.value = ''; // Réinitialiser la recherche

            // Récupère le conteneur de l'équipe et ses filtres, ou les initialise
            const teamContainer = currentSlot.closest('.team-container');
            if (!teamContainer.filters) {
                teamContainer.filters = { type: [], class: [] };
            }
            const currentTeamFilters = teamContainer.filters;

            // Met à jour l'état visuel des boutons de filtre pour correspondre à l'équipe
            document.querySelectorAll('.filter-btn').forEach(btn => {
                const filterType = btn.dataset.filterType;
                const value = btn.dataset.value;
                if (currentTeamFilters[filterType] && currentTeamFilters[filterType].includes(value)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            modalTitle.textContent = "Choisir un Personnage";
            searchInput.style.display = 'block';
            if (filterFolder) filterFolder.style.display = 'block';
            renderModalCharacters(); // Afficher les persos
            modal.style.display = 'block';
        });
    });

    // Gestion de la recherche
    searchInput.addEventListener('input', debounce((e) => {
        renderModalCharacters(e.target.value);
    }, 300)); // Délai de 300ms pour ne pas surcharger le navigateur

    // Fermeture de la modale
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Bouton Retirer : Vide le slot et ferme la modale
    removeBtn.addEventListener('click', () => {
        if (currentSlot) {
            currentSlot.innerHTML = '';
            currentSlot.classList.remove('filled');
            modal.style.display = 'none';
        }
    });

    // Bouton Annuler : Ferme juste la modale
    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
        if (event.target == bossInfoModal) {
            bossInfoModal.style.display = 'none';
        }
        if (event.target == confirmModal) {
            confirmModal.style.display = 'none';
        }
    });
});

// Configuration des statistiques des Boss pour le Kizuna
// Vous pouvez modifier les valeurs ci-dessous pour chaque Kizuna.
// Utilisez \n pour faire des sauts de ligne dans le texte.

window.bossStats = {
    // ==========================================
    //            BOSS NORMAUX (VS Type)
    // ==========================================
    
    "STR": {
        "Boss": "",
        "Classes": "",
        "Personnages Recommandés": "",
        "Stage 1": "",
        "Stage 2": "",
        "Stage 3 (Lv31+)": ""
    },

    "DEX": {
        "Boss": "Eustass Kid",
        "Classes": "Intellectuel",
        "Personnages Recommandés": "[4547][4548]",
        "Stage 1": "Pour les [Cogneur] / [Tireur] / [Intellectuel] :\n [Spe CD]Réduction du temps de chargement des coups spéciaux de 15 tours.\n [Switch CD]Chargement du Super changement de 15 tours.\n [VS CD]Jauge VS de 15 tours.\n [Retraite]Retraite !",
        "Stage 2": "Apparition de 5 ennemis.\n\n [Actions Preventives]\n [Spe Retour]Inversion des coups spéciaux des coéquipiers (2 tours).\n [Spe Bloqué]Coup spécial bloqué des coéquipiers (PERFECT x2).\n [Barriere]Barrière de timing (GREAT x2).\n [Normal Only]Dégâts autres que ceux des ATK normales réduits à 1.\n\n [Interruption]Après 1 tour :\n [Slot Bloqué]Lien des cercles (3 tours)\n [Retraite]Retraite.",
        "Stage 3 (Lv31+)": "[Etat Initial] Eustass Kid.\n [Immunités]Immunisé aux altérations d'état (sauf Retard).\n [Immunité Death]Immunisé aux Spéciaux de mort immédiate.\n [Résistance dégats]Résistance aux dégâts proportionnels 100%.\n Classe vulnérable : [Intellectuel].\n\n [Actions Preventives]\n [SP Bind]Lien des coups spéciaux des coéquipiers (10 tours).\n [ATK Down]ATK de l'équipe x1.1 (3 tours).\n [Def UP]DEF +10 000 000 (6 tours).\n Applique 'Territoire Ennemi' sur le terrain (3 tours).\n [Limites]Lors d'ATK avec des cercles [DEX][QCK][PSY][INT][WA][RCV][TND][Bomb], réduit les dégâts de 90%.\n [Intimidate]Réduit la durée de la réduction de dégâts / seuil de l'équipe de 2 tours.\n [Normal Only]Dégâts autres que ceux des ATK normales réduits à 1.\n\n [Interruption]Si [Normal Only]n'est pas appliqué (après Spécial / Super / VS / Changement) :\n [Heal]Restaure tous les HP,\n [Silence]Silence (99 tours),\n [Clear]Supprime les bonus,\n [Normal Only]NAO.\n\n [Actions Vaincu]\n [Damage]220 000 points de dégâts."
    },

    "QCK": {
        "Boss": "Eustass Kid",
        "Classes": "Intellectuel",
        "Personnages Recommandés": "[4547][4548]",
        "Stage 1": "Pour les [STR] / [DEX] :\n [Spe CD]Réduction du temps de chargement des coups spéciaux de 15 tours.\n [Switch CD]Chargement du Super changement de 15 tours.\n [VS CD]Jauge VS de 15 tours.\n [Retraite]Retraite !",
        "Stage 2": "[BLK]Change tous les cercles en [BLK].\n [SP Bind]Lien des coups spéciaux (6 tours).\n [Barriere]Barrière de cercles ([STR] x2, pendant 3 tours).\n [Normal Only]Dégâts autres que ceux des ATK normales réduits à 1.\n [Intimidate] Pendant 2 tour(s), parmi les altérations d'état concernées, réduit certaines altérations d'état de 1 tour (Altération d'état concernées : Augmentation de l'ATK de l'équipe).",
        "Stage 3 (Lv31+)": "[Etat Initial] Eustass Kid.\n [Immunités]Immunisé aux altérations d'état (sauf [Poison]).\n [Immunité Death]Immunisé aux Spéciaux de mort immédiate.\n [Résistance dégats]Résistance aux dégâts proportionnels 100%.\n Classe vulnérable : [Intellectuel].\n\n [Actions Preventives]\n [SP Bind]Lien des coups spéciaux (7 tours).\n [Despair]Désespoir des capitaines (10 tours).\n [Slot Lock]Bloque les cercles (1 tour).\n [Limites]Cercles [DEX][QCK][PSY][INT][TND] désavantageux (2 tours).\n L'équipe ne peut infliger que 80% des HP max de l'ennemi par tour (10 tours).\n Applique 'Territoire Ennemi' (3 tours).\n [Damage]162 000 points de dégâts.\n [Despair]Désespoir des coéquipiers (1 tour).\n [Resilience]Résistance avec 1 HP (6 tours).\n [Intimidate] Pendant 3 tour(s), parmi les altérations d'état concernées, réduit certaines altérations d'état de 1 tour (Altération d'état concernées : Augmentation de l'ATK de l'équipe).\n [Normal Only]Dégâts autres que ceux des ATK normales réduits à 1.\n\n [Actions Normal]\n [Hunger]Jusqu'à l'obtention de 3 cercles [RCV]/[SEMLA]consommés : Réduit les HP de l'équipe de 30% chaque tour et [ATK Down]ATK -90%.\n\n [Interruption]Si [Normal Only]n'est pas appliqué (après Spécial / Super / VS / Changement) :\n Restaure tous les HP,\n [Silence]Silence (99 tours),\n [Clear]Supprime les bonus,\n [Normal Only]NAO."
    },

    "PSY": {
        "Boss": "",
        "Classes": "",
        "Personnages Recommandés": "",
        "Stage 1": "Pour les  :\n- CD de 15 tours\n- Super Switch de 15 tours\n- VS Gauge de 15 tours",
        "Stage 2": "",
        "Stage 3 (Lv31+)": ""
    },

    "INT": {
        "Boss": "",
        "Classes": "",
        "Personnages Recommandés": "",
        "Stage 1": "",
        "Stage 2": "",
        "Stage 3 (Lv31+)": ""
    },

    // ==========================================
    //            SUPER BOSS (VS Type)
    // ==========================================
    // Le script cherche les clés commençant par 'Super_' + le type

    "Super_STR": {
        "Boss": "",
        "Classes": "",
        "Personnages Recommandés": "",
        "Stage 1": "Pour les  :\n- CD de 15 tours\n- Super Switch de 15 tours\n- VS Gauge de 15 tours",
        "Stage 2": "",
        "Stage 3 (Lv31+)": ""
    },

    "Super_DEX": {
        "Boss": "",
        "Classes": "",
        "Personnages Recommandés": "",
        "Stage 1": "Pour les  :\n- CD de 15 tours\n- Super Switch de 15 tours\n- VS Gauge de 15 tours",
        "Stage 2": "",
        "Stage 3 (Lv31+)": ""
    },

    "Super_QCK": {
        "Boss": "",
        "Classes": "",
        "Personnages Recommandés": "",
        "Stage 1": "Pour les  :\n- CD de 15 tours\n- Super Switch de 15 tours\n- VS Gauge de 15 tours",
        "Stage 2": "",
        "Stage 3 (Lv31+)": ""
    },

    "Super_PSY": {
        "Boss": "",
        "Classes": "",
        "Personnages Recommandés": "",
        "Stage 1": "Pour les  :\n- CD de 15 tours\n- Super Switch de 15 tours\n- VS Gauge de 15 tours",
        "Stage 2": "",
        "Stage 3 (Lv31+)": ""
    },

    "Super_INT": {
        "Boss": "",
        "Classes": "",
        "Personnages Recommandés": "",
        "Stage 1": "Pour les  :\n- CD de 15 tours\n- Super Switch de 15 tours\n- VS Gauge de 15 tours",
        "Stage 2": "",
        "Stage 3 (Lv31+)": ""
    },

    // ========================================== //
    //            EXEMPLE VIERGE                  //
    // ========================================== //

   "EXEMPLE": {
        "Boss": "",
        "Classes": "",
        "Personnages Recommandés": "",
        "Stage 1": "Pour les  :\n [Spe CD]Temps de chargement des coups spéciaux réduit de 15 tours.\n [Switch CD]Nombre requis avant l`activation des Super effets de changements réduit de 15 tours.\n [VS CD]Réduit la jauge des effets VS de 15 tours.\n [Retraite]Retraite!",
        "Stage 2": "",
        "Stage 3 (Lv31+)": ""
    },

};

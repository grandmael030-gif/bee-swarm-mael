// ============================================
// DONNÉES DES BEARS (JSON)
// ============================================

const BEARS_DATA = {
    bruno: {
        id: 'bruno',
        name: 'Bruno le Bourdon',
        title: 'L\'Apprenti Butineur',
        location: 'La Prairie Dorée (centre de la map)',
        appearance: {
            color: '#8B4513',
            size: 'medium',
            accessories: ['Petit chapeau de paille', 'Panier de fleurs'],
            description: 'Un ours brun maladroit mais bien intentionné. Il porte toujours un chapeau de paille trop grand pour lui.'
        },
        personality: 'Gentil, un peu lent, encourageant. Parle avec des "Euh..." et des "Hmm..."',
        unlockCondition: 'Disponible dès le début',
        dialogues: {
            greeting: 'Euh... salut toi ! Tu veux apprendre à butiner ?',
            completed: 'Trop fort ! Tu es devenu un vrai butineur ! Va voir mes amis ailleurs !'
        },
        quests: [
            {
                id: 'bruno_1',
                name: 'Premiers Pas',
                description: 'Collecte du pollen pour commencer',
                dialogueStart: 'Euh... commence par collecter un peu de pollen. 50 unités devraient suffire !',
                dialogueComplete: 'Super ! Tu vois, c\'est pas si dur !',
                objectives: [
                    { type: 'collect_pollen', target: 50, description: 'Collecter 50 pollen' }
                ],
                rewards: { honey: 100, xp: 10 }
            },
            {
                id: 'bruno_2',
                name: 'Première Abeille',
                description: 'Achète ton premier upgrade',
                dialogueStart: 'Hmm... avec du miel, tu peux acheter des upgrades. Fais 200 miels !',
                dialogueComplete: 'Excellent ! Maintenant tu peux acheter une amélioration !',
                objectives: [
                    { type: 'make_honey', target: 200, description: 'Convertir 200 pollen en miel' }
                ],
                rewards: { honey: 150, xp: 15 }
            },
            {
                id: 'bruno_3',
                name: 'Collectionneur',
                description: 'Améliore ta capacité',
                dialogueStart: 'Euh... il te faut plus de place ! Achète l\'upgrade Capacity une fois.',
                dialogueComplete: 'Parfait ! Tu pourras transporter plus de pollen maintenant.',
                objectives: [
                    { type: 'buy_upgrade', target: 1, upgradeType: 'capacity', description: 'Acheter 1 upgrade Capacity' }
                ],
                rewards: { honey: 250, xp: 20 }
            },
            {
                id: 'bruno_4',
                name: 'Explorateur',
                description: 'Trouve des fleurs',
                dialogueStart: 'Hmm... va voir les fleurs ! Collecte du pollen de 10 fleurs différentes.',
                dialogueComplete: 'Wouah ! Tu connais bien la prairie maintenant !',
                objectives: [
                    { type: 'visit_flowers', target: 10, description: 'Visiter 10 fleurs différentes' }
                ],
                rewards: { honey: 300, xp: 25, bee: 'common' }
            },
            {
                id: 'bruno_5',
                name: 'Le Vrai Butineur',
                description: 'Deviens un expert',
                dialogueStart: 'Euh... dernière épreuve : collecte 500 pollen d\'un coup !',
                dialogueComplete: 'Incroyable ! Tu es prêt pour l\'aventure ! Va voir Luna la Lunatique !',
                objectives: [
                    { type: 'collect_pollen_single', target: 500, description: 'Collecter 500 pollen en une fois' }
                ],
                rewards: { honey: 500, xp: 50, bee: 'rare' }
            }
        ]
    },
    
    luna: {
        id: 'luna',
        name: 'Luna la Lunatique',
        title: 'La Gardienne de Nuit',
        location: 'Le Bosquet Lunaire (nord-ouest, près des fleurs bleues)',
        appearance: {
            color: '#4B0082',
            size: 'small',
            accessories: ['Couronne d\'étoiles', 'Cape argentée'],
            description: 'Une petite ourse violette qui brille dans la nuit. Elle ne sort que quand le soleil se couche.'
        },
        personality: 'Mystérieuse, rêveuse, parle en énigmes. Aime les fleurs bleues.',
        unlockCondition: 'Débloquée après avoir complété 2 quêtes de Bruno',
        dialogues: {
            greeting: '*brille doucement* Tu viens de la part de Bruno ? Intéressant...',
            completed: 'Tu as capturé l\'essence de la nuit. Va maintenant vers l\'est...'
        },
        quests: [
            {
                id: 'luna_1',
                name: 'Fleurs de Lune',
                description: 'Trouve les fleurs bleues',
                dialogueStart: 'Les fleurs bleues chantent la nuit... Trouve-moi 20 d\'entre elles.',
                dialogueComplete: '*sourit* Tu entends leur chanson maintenant ?',
                objectives: [
                    { type: 'collect_blue_pollen', target: 20, description: 'Collecter 20 pollen de fleurs bleues' }
                ],
                rewards: { honey: 400, xp: 30 }
            },
            {
                id: 'luna_2',
                name: 'Danse Nocturne',
                description: 'Active le mode auto',
                dialogueStart: 'La nuit travaille pour toi... Achète l\'upgrade Auto-Collect.',
                dialogueComplete: 'Parfait. Maintenant tu danses même en dormant.',
                objectives: [
                    { type: 'buy_upgrade', target: 1, upgradeType: 'auto', description: 'Acheter Auto-Collect' }
                ],
                rewards: { honey: 600, xp: 40 }
            },
            {
                id: 'luna_3',
                name: 'Abeilles de Minuit',
                description: 'Obtiens une abeille spéciale',
                dialogueStart: 'Les abeilles nocturnes sont rares... Obtiens une abeille Rouge ou meilleure (Bleue ou Légendaire) !',
                dialogueComplete: 'Elle brille comme les étoiles !',
                objectives: [
                    { type: 'obtain_bee_rare', target: 1, description: 'Obtenir 1 abeille Rouge ou mieux' }
                ],
                rewards: { honey: 800, xp: 50, bee: 'rare' }
            },
            {
                id: 'luna_4',
                name: 'Pollen Stellaire',
                description: 'Une collecte massive',
                dialogueStart: 'La voie lactée est faite de pollen... Collecte 2000 pollen.',
                dialogueComplete: 'Tu portes les étoiles dans ton panier !',
                objectives: [
                    { type: 'collect_pollen', target: 2000, description: 'Collecter 2000 pollen au total' }
                ],
                rewards: { honey: 1000, xp: 60, bee: 'epic' }
            },
            {
                id: 'luna_5',
                name: 'La Nuit Éternelle',
                description: 'Maîtrise la nuit',
                dialogueStart: 'Dernier test : convertis 3000 miels pendant que le monde dort.',
                dialogueComplete: 'Tu es un enfant de la nuit. Rusty t\'attend à l\'est...',
                objectives: [
                    { type: 'make_honey_total', target: 3000, description: 'Avoir fait 3000 miel au total' }
                ],
                rewards: { honey: 1500, xp: 80, bee: 'legendary' }
            }
        ]
    },
    
    rusty: {
        id: 'rusty',
        name: 'Rusty le Rouillé',
        title: 'L\'Inventeur Fou',
        location: 'La Forge Abandonnée (est, zone industrielle)',
        appearance: {
            color: '#B7410E',
            size: 'large',
            accessories: ['Lunettes de protection', 'Tablier taché', 'Clé à molette'],
            description: 'Un ours rouillé-orange couvert de cambouis. Il construit des machines bizarres dans sa forge.'
        },
        personality: 'Energique, parle vite, obsédé par les machines. Fait des explosions parfois.',
        unlockCondition: 'Débloqué après avoir complété Luna',
        dialogues: {
            greeting: 'HA ! Un nouveau cobaye ! Euh, je veux dire... APPRENTI !',
            completed: 'TU ES PRÊT ! Va voir Misty, elle a besoin d\'aide au nord !'
        },
        quests: [
            {
                id: 'rusty_1',
                name: 'Collecteur de Vitesse',
                description: 'Améliore tes abeilles',
                dialogueStart: 'Tes abeilles sont LENTES ! Achète 3 upgrades Speed ! VITE !',
                dialogueComplete: 'MIEUX ! Mais on peut faire plus rapide !',
                objectives: [
                    { type: 'buy_upgrade', target: 3, upgradeType: 'speed', description: 'Acheter 3 upgrades Speed' }
                ],
                rewards: { honey: 600, xp: 35 }
            },
            {
                id: 'rusty_2',
                name: 'Machines !',
                description: 'Automatise tout',
                dialogueStart: 'Les machines travaillent pour nous ! Achète Auto-Convert niveau 3 !',
                dialogueComplete: 'BOOM ! Euh, je veux dire... PARFAIT !',
                objectives: [
                    { type: 'upgrade_level', target: 3, upgradeType: 'convert', description: 'Avoir Auto-Convert niveau 3' }
                ],
                rewards: { honey: 800, xp: 45 }
            },
            {
                id: 'rusty_3',
                name: 'L\'Essence de la Vitesse',
                description: 'Collection rapide',
                dialogueStart: 'Rapide ! Collecte 1000 pollen en MOINS de 5 minutes !',
                dialogueComplete: 'WOOOO ! T\'as vu ça ? T\'es un éclair !',
                objectives: [
                    { type: 'collect_pollen_timed', target: 1000, timeLimit: 300, description: '1000 pollen en 5 minutes' }
                ],
                rewards: { honey: 1200, xp: 55 }
            },
            {
                id: 'rusty_4',
                name: 'Abeille Turbo',
                description: 'Obtenir une abeille rapide',
                dialogueStart: 'Il te faut une abeille qui VOLE ! Obtiens une abeille Bleue !',
                dialogueComplete: 'ELLE DÉCHIRE ! Regarde-moi cette beauté !',
                objectives: [
                    { type: 'obtain_bee_epic', target: 1, description: 'Obtenir 1 abeille Bleue' }
                ],
                rewards: { honey: 1500, xp: 65, bee: 'epic' }
            },
            {
                id: 'rusty_5',
                name: 'La Vitesse Suprême',
                description: 'Deviens éclair',
                dialogueStart: 'Dernier test : 5000 pollen en 10 minutes. PRÊT ? PARTEZ !',
                dialogueComplete: 'INCROYABLE ! Tu bats tous les records !',
                objectives: [
                    { type: 'collect_pollen_timed', target: 5000, timeLimit: 600, description: '5000 pollen en 10 minutes' }
                ],
                rewards: { honey: 3000, xp: 100, bee: 'legendary' }
            }
        ]
    },
    
    misty: {
        id: 'misty',
        name: 'Misty la Brumeuse',
        title: 'La Gardienne des Secrets',
        location: 'La Forêt Brumeuse (nord, zone mystérieuse)',
        appearance: {
            color: '#708090',
            size: 'medium',
            accessories: ['Voile de brume', 'Collier de perles de rosée'],
            description: 'Une ourse grise semi-transparente qui flotte dans la brume. On dirait un fantôme gentil.'
        },
        personality: 'Calme, énigmatique, parle en métaphores. Connaît tous les secrets de la forêt.',
        unlockCondition: 'Débloqué après avoir complété Rusty',
        dialogues: {
            greeting: '*apparaît dans la brume* Tu viens de loin, voyageur...',
            completed: 'Tu as percé tous les mystères. Ember t\'attend au sommet...'
        },
        quests: [
            {
                id: 'misty_1',
                name: 'Secrets de la Forêt',
                description: 'Explore la map',
                dialogueStart: 'La forêt cache des secrets... Visite tous les coins de la prairie.',
                dialogueComplete: 'Tu sens les murmures des arbres maintenant ?',
                objectives: [
                    { type: 'explore_zones', target: 4, description: 'Visiter 4 zones différentes (centre, nord, est, ouest)' }
                ],
                rewards: { honey: 800, xp: 40 }
            },
            {
                id: 'misty_2',
                name: 'Chance Mystique',
                description: 'Améliore ta luck',
                dialogueStart: 'La fortune sourit aux audacieux... Achète l\'upgrade Luck niveau 5.',
                dialogueComplete: 'La chance coule dans tes veines...',
                objectives: [
                    { type: 'upgrade_level', target: 5, upgradeType: 'luck', description: 'Avoir Luck niveau 5' }
                ],
                rewards: { honey: 1000, xp: 50 }
            },
            {
                id: 'misty_3',
                name: 'Abeille Légendaire ?',
                description: 'Tente ta chance',
                dialogueStart: 'Une légende dort dans la brume... Obtiens une abeille LÉGENDAIRE (dorée) !',
                dialogueComplete: 'Elle est VRAIE ! La légende est vraie !',
                objectives: [
                    { type: 'obtain_bee_legendary', target: 1, description: 'Obtenir 1 abeille Légendaire (dorée)' }
                ],
                rewards: { honey: 2000, xp: 100, bee: 'legendary' }
            },
            {
                id: 'misty_4',
                name: 'Le Jardinier',
                description: 'Fais pousser la nature',
                dialogueStart: 'La vie fleurit sous tes pas... Achète Flowers niveau 3.',
                dialogueComplete: 'La prairie te remercie...',
                objectives: [
                    { type: 'upgrade_level', target: 3, upgradeType: 'flowers', description: 'Avoir Flowers niveau 3' }
                ],
                rewards: { honey: 1500, xp: 70 }
            },
            {
                id: 'misty_5',
                name: 'Le Maître des Secrets',
                description: 'Tout révéler',
                dialogueStart: 'Ultime secret : collecte 10 000 pollen. Seuls les maîtres y arrivent.',
                dialogueComplete: 'Tu connais maintenant tous les secrets... Ember t\'attend.',
                objectives: [
                    { type: 'collect_pollen', target: 10000, description: 'Collecter 10 000 pollen au total' }
                ],
                rewards: { honey: 5000, xp: 150, bee: 'legendary' }
            }
        ]
    },
    
    ember: {
        id: 'ember',
        name: 'Ember l\'Ardent',
        title: 'Le Maître du Volcan',
        location: 'Le Cratère Ardente (sommet sud, zone difficile)',
        appearance: {
            color: '#FF4500',
            size: 'large',
            accessories: ['Couronne de flammes', 'Armure dorée', 'Ailes de feu'],
            description: 'Un ours rouge-orangé gigantesque entouré de flammes. Le plus puissant de tous les bears.'
        },
        personality: 'Fière, exigeante, reconnait seulement la force. Mais juste et généreuse avec les vainqueurs.',
        unlockCondition: 'Débloqué après avoir complété tous les autres bears',
        dialogues: {
            greeting: 'HA ! Un challenger ! Prouve ta valeur ou brûle !',
            completed: 'TU ES DIGNES ! Le trône est à toi, Maître des Abeilles !'
        },
        quests: [
            {
                id: 'ember_1',
                name: 'Le Feu Sacré',
                description: 'Montre ta puissance',
                dialogueStart: 'Faible ! Collecte 2000 pollen pour me prouver que tu existes !',
                dialogueComplete: 'Hmm... acceptable. Continuons.',
                objectives: [
                    { type: 'collect_pollen', target: 2000, description: 'Collecter 2000 pollen' }
                ],
                rewards: { honey: 2000, xp: 50 }
            },
            {
                id: 'ember_2',
                name: 'Forge de Miel',
                description: 'Produis en masse',
                dialogueStart: 'Le miel est le sang de la ruche ! Fais 5000 miels !',
                dialogueComplete: 'Impressionnant... tu travailles dur.',
                objectives: [
                    { type: 'make_honey', target: 5000, description: 'Convertir 5000 pollen en miel' }
                ],
                rewards: { honey: 3000, xp: 70 }
            },
            {
                id: 'ember_3',
                name: 'Armure Complète',
                description: 'Tous les upgrades',
                dialogueStart: 'Un vrai guerrier a tout ! Achète AU MOINS 1 de CHAQUE upgrade !',
                dialogueComplete: 'Bien ! Tu comprends l\'équilibre du pouvoir.',
                objectives: [
                    { type: 'buy_all_upgrades', target: 1, description: 'Acheter au moins 1 de chaque type d\'upgrade' }
                ],
                rewards: { honey: 4000, xp: 80 }
            },
            {
                id: 'ember_4',
                name: 'L\'Essence de la Bulle',
                description: 'Maîtrise la collecte',
                dialogueStart: 'Collecte comme un roi ! Achète Bubble niveau 5 !',
                dialogueComplete: 'Ta bulle est immense ! Parfait !',
                objectives: [
                    { type: 'upgrade_level', target: 5, upgradeType: 'bubble', description: 'Avoir Bubble niveau 5' }
                ],
                rewards: { honey: 5000, xp: 90 }
            },
            {
                id: 'ember_5',
                name: 'Le Trône de Feu',
                description: 'Deviens une légende',
                dialogueStart: 'ÉPREUVE FINALE : 50 000 pollen collecté. SEULS LES DIEUX Y ARRIVENT !',
                dialogueComplete: 'TU AS RÉUSSI ! TU ES LE NOUVEAU MAÎTRE ! PRENDS CETTE ABEILLE DIVINE !',
                objectives: [
                    { type: 'collect_pollen', target: 50000, description: 'Collecter 50 000 pollen au total' }
                ],
                rewards: { honey: 10000, xp: 500, bee: 'legendary', title: 'Maître des Abeilles' }
            }
        ]
    }
};

// ============================================
// BEAR SYSTEM - Gestion des quêtes d'ours
// ============================================

class BearSystem {
    constructor() {
        this.bears = BEARS_DATA;
        this.playerQuests = {}; // Stockage des progressions
        this.loadQuests();
    }
    
    loadQuests() {
        const saved = localStorage.getItem('beeSwarm_bearQuests');
        if (saved) {
            this.playerQuests = JSON.parse(saved);
        }
    }
    
    saveQuests() {
        localStorage.setItem('beeSwarm_bearQuests', JSON.stringify(this.playerQuests));
    }
    
    // Récupère la progression actuelle d'un joueur pour un bear
    getBearProgress(bearId) {
        if (!this.playerQuests[bearId]) {
            this.playerQuests[bearId] = {
                unlocked: bearId === 'bruno', // Seul Bruno débloqué au début
                currentQuestIndex: 0,
                questProgress: {},
                completed: false
            };
        }
        // Ensure questProgress exists (fix for corrupted/old save data)
        if (!this.playerQuests[bearId].questProgress) {
            this.playerQuests[bearId].questProgress = {};
        }
        return this.playerQuests[bearId];
    }
    
    // Alias pour compatibilité avec game.js
    getQuestProgress(bearId) {
        return this.getBearProgress(bearId);
    }
    
    // Initialiser les baselines pour les quêtes d'upgrade (appelé quand une quête devient active)
    initUpgradeBaselines(bearId, currentUpgrades) {
        const progress = this.getBearProgress(bearId);
        const bear = this.bears[bearId];
        const quest = bear.quests[progress.currentQuestIndex];
        
        if (!quest) return;
        
        // Pour chaque objectif d'upgrade, capturer le niveau actuel comme baseline
        for (const obj of quest.objectives) {
            if ((obj.type === 'buy_upgrade' || obj.type === 'upgrade_level') && obj.upgradeType) {
                const baselineKey = `baseline_${obj.upgradeType}`;
                // Si pas de baseline encore définie, la définir
                if (progress.questProgress[baselineKey] === undefined) {
                    const currentLevel = currentUpgrades[obj.upgradeType] || 0;
                    progress.questProgress[baselineKey] = currentLevel;
                    console.log(`📊 Baseline ${bearId}: ${obj.upgradeType} = ${currentLevel} (target: +${obj.target})`);
                }
            }
        }
        this.saveQuests();
    }
    
    // Mettre à jour la progression des quêtes d'upgrade basée sur les niveaux actuels
    updateUpgradeProgress(bearId, currentUpgrades) {
        const progress = this.getBearProgress(bearId);
        const bear = this.bears[bearId];
        const quest = bear.quests[progress.currentQuestIndex];
        
        if (!quest || !progress.unlocked || progress.completed) return;
        
        for (const obj of quest.objectives) {
            if ((obj.type === 'buy_upgrade' || obj.type === 'upgrade_level') && obj.upgradeType) {
                const baselineKey = `baseline_${obj.upgradeType}`;
                const baseline = progress.questProgress[baselineKey];
                
                // Si baseline définie, calculer le progrès
                if (baseline !== undefined) {
                    const currentLevel = currentUpgrades[obj.upgradeType] || 0;
                    const progressMade = Math.max(0, currentLevel - baseline);
                    progress.questProgress[obj.type] = progressMade;
                }
            }
        }
        this.saveQuests();
    }
    
    // Vérifier si une quête est complétée
    checkQuestCompletion(bearId) {
        const bear = this.bears[bearId];
        const progress = this.getBearProgress(bearId);
        const quest = bear.quests[progress.currentQuestIndex];
        
        if (!quest) return false;
        
        // Vérifier chaque objectif
        let completed = true;
        for (const objective of quest.objectives) {
            // Pour les quêtes d'upgrade, vérifier le progrès depuis la baseline
            if ((objective.type === 'buy_upgrade' || objective.type === 'upgrade_level') && objective.upgradeType) {
                const baselineKey = `baseline_${objective.upgradeType}`;
                const baseline = progress.questProgress[baselineKey];
                if (baseline !== undefined) {
                    // Le progrès est stocké dans questProgress[objective.type]
                    const current = progress.questProgress[objective.type] || 0;
                    if (current < objective.target) {
                        completed = false;
                    }
                } else {
                    completed = false;
                }
            } else {
                // Pour les autres types de quêtes, comportement normal
                const current = progress.questProgress[objective.type] || 0;
                if (current < objective.target) {
                    completed = false;
                    break;
                }
            }
        }
        
        return completed;
    }
    
    // Mettre à jour la progression
    updateProgress(type, amount) {
        for (const bearId in this.playerQuests) {
            const progress = this.playerQuests[bearId];
            if (progress.unlocked && !progress.completed) {
                const bear = this.bears[bearId];
                const quest = bear.quests[progress.currentQuestIndex];
                
                if (quest) {
                    for (const obj of quest.objectives) {
                        if (obj.type === type) {
                            // Ensure questProgress exists
                            if (!progress.questProgress) {
                                progress.questProgress = {};
                            }
                            const oldVal = progress.questProgress[type] || 0;
                            progress.questProgress[type] = oldVal + amount;
                            console.log(`✅ ${bearId}: ${type} ${oldVal} → ${progress.questProgress[type]}/${obj.target}`);
                        }
                    }
                }
            }
        }
        this.saveQuests();
    }
    
    // Alias pour compatibilité avec game.js
    updateQuestProgress(type, amount) {
        return this.updateProgress(type, amount);
    }
    
    // Compléter une quête et donner les récompenses
    completeQuest(bearId) {
        const progress = this.getBearProgress(bearId);
        const bear = this.bears[bearId];
        const quest = bear.quests[progress.currentQuestIndex];
        
        if (!quest || !this.checkQuestCompletion(bearId)) {
            return null;
        }
        
        // Donner récompenses
        const rewards = { ...quest.rewards };
        const bearName = bear.name;
        const questName = quest.name;
        
        // Passer à la quête suivante
        progress.currentQuestIndex++;
        progress.questProgress = {};
        
        // Initialiser les baselines pour la nouvelle quête si c'est une quête d'upgrade
        const nextQuest = bear.quests[progress.currentQuestIndex];
        if (nextQuest) {
            for (const obj of nextQuest.objectives) {
                if ((obj.type === 'buy_upgrade' || obj.type === 'upgrade_level') && obj.upgradeType) {
                    // La baseline sera initialisée au prochain appel de initUpgradeBaselines
                    // mais on s'assure que le questProgress existe
                    if (!progress.questProgress) {
                        progress.questProgress = {};
                    }
                }
            }
        }
        
        // Débloquer le bear suivant si c'était la dernière quête
        if (progress.currentQuestIndex >= bear.quests.length) {
            progress.completed = true;
            this.unlockNextBear(bearId);
        }
        
        // Débloquer d'autres bears selon les conditions
        this.checkUnlockConditions();
        
        this.saveQuests();
        return { rewards, bearName, questName };
    }
    
    // Débloquer le bear suivant
    unlockNextBear(currentBearId) {
        const unlockChain = ['bruno', 'luna', 'rusty', 'misty', 'ember'];
        const currentIndex = unlockChain.indexOf(currentBearId);
        if (currentIndex >= 0 && currentIndex < unlockChain.length - 1) {
            const nextBearId = unlockChain[currentIndex + 1];
            this.playerQuests[nextBearId].unlocked = true;
        }
    }
    
    // Vérifier les conditions de déblocage spéciales
    checkUnlockConditions() {
        // Luna se débloque après avoir collecté 1000 pollen total
        const bruno = this.getBearProgress('bruno');
        if (!this.playerQuests['luna'].unlocked && bruno.currentQuestIndex >= 2) {
            this.playerQuests['luna'].unlocked = true;
        }
    }
    
    // Obtenir les bears débloqués
    getUnlockedBears() {
        return Object.keys(this.bears).filter(id => {
            const progress = this.getBearProgress(id);
            return progress.unlocked;
        });
    }
    
    // Dialogue actuel d'un bear
    getCurrentDialogue(bearId) {
        const bear = this.bears[bearId];
        const progress = this.getBearProgress(bearId);
        const quest = bear.quests[progress.currentQuestIndex];
        
        if (!quest) {
            return { text: bear.dialogues.completed, isCompleted: true };
        }
        
        const isComplete = this.checkQuestCompletion(bearId);
        return {
            text: isComplete ? quest.dialogueComplete : quest.dialogueStart,
            isComplete: isComplete,
            quest: quest
        };
    }
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BearSystem, BEARS_DATA };
}

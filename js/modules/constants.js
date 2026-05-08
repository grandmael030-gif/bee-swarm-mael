/**
 * Constants and Configuration Module
 * Centralized configuration for the entire game
 */

export const AUTH_CONFIG = {
    ALLOWED_EMAILS: ['grandmael030@mail.com', 'grandmael030@gmail.com'],
    PASSWORD_HASH: 'Mael04022012',
    DEV_MODE_PARAM: 'dev'
};

export const GAME_CONFIG = {
    // Bee configuration
    BEE_TYPES: {
        BASIC: { speed: 2, capacity: 10, color: '#FFFF00', cost: 0 },
        RED: { speed: 2.5, capacity: 30, color: '#FF4444', cost: 500 },
        BLUE: { speed: 3, capacity: 50, color: '#4444FF', cost: 5000 },
        LEGENDARY: { speed: 4, capacity: 100, color: '#FFD700', cost: 50000 }
    },

    // Game mechanics
    INITIAL_BEE_LIMIT: 100,
    REBIRTH_BEE_INCREMENT: 50,
    REBIRTH_COST_HONEY: 1000000,
    REBIRTH_BONUS_MULTIPLIER: 0.1,

    // Flower configuration
    DEFAULT_FLOWER_COUNT: 20,
    DEFAULT_REGEN_TIME_MS: 5000,
    FLOWER_MIN_POLLEN: 50,
    FLOWER_MAX_POLLEN: 100,

    // Upgrade configuration
    MAX_UPGRADE_LEVEL: 10,
    UPGRADE_COSTS: {
        speed: 500,
        capacity: 1000,
        auto: 5000,
        convert: 10000,
        luck: 2500,
        flowers: 5000,
        regen: 2000,
        bubble: 2000
    },

    // Teleport mode
    TELEPORT_ENABLE_LEVEL: 7,
    INFINITE_FLOWERS_SPEED_LEVEL: 7,
    INFINITE_FLOWERS_REGEN_LEVEL: 10,

    // Conversion multipliers
    CONVERSION_MULTIPLIERS: {
        DEFAULT: 0.5,
        LEVEL_5: 2,
        LEVEL_10: 3
    },

    // Screen boundaries
    BOUNDARY_PADDING: 30
};

export const DISPLAY_CONFIG = {
    // Canvas
    BACKGROUND_COLOR: '#87CEEB',
    GRASS_COLOR: '#90EE90',
    PLAYER_COLOR: '#8B4513',
    PLAYER_RADIUS: 15,

    // Particle effects
    PARTICLE_LIFE: 1,
    PARTICLE_DECAY: 0.02,

    // UI
    ANIMATION_FRAME_RATE: 60,
    AUTO_SAVE_INTERVAL_MS: 30000,

    // Zones for tracking
    ZONE_DIVISIONS: 3
};

export const ACHIEVEMENTS = {
    FIRST_BEE: {
        id: 'first_bee',
        name: '🐝 Premier Essaim',
        description: 'Obtiens ta première abeille',
        icon: '🐝',
        reward: { honey: 100 }
    },
    HUNDRED_BEES: {
        id: 'hundred_bees',
        name: '🐝 Essaim Complet',
        description: 'Possède 100 abeilles',
        icon: '🐝🐝🐝',
        reward: { honey: 50000 }
    },
    FIRST_REBIRTH: {
        id: 'first_rebirth',
        name: '✨ Renaissance',
        description: 'Effectue ta première renaissance',
        icon: '✨',
        reward: { honey: 500000 }
    },
    LEGENDARY_BEE: {
        id: 'legendary_bee',
        name: '⭐ Légendaire',
        description: 'Obtiens une abeille légendaire',
        icon: '⭐',
        reward: { honey: 100000 }
    },
    MILLION_HONEY: {
        id: 'million_honey',
        name: '💰 Millionnaire',
        description: 'Accumule 1 million de miel',
        icon: '💰',
        reward: { pollen: 10000 }
    },
    SPEED_DEMON: {
        id: 'speed_demon',
        name: '⚡ Vitesse Maximale',
        description: 'Atteins le niveau 10 d\'upgrade vitesse',
        icon: '⚡',
        reward: { honey: 250000 }
    },
    MASTER_CONVERTER: {
        id: 'master_converter',
        name: '🔄 Maître Convertisseur',
        description: 'Atteins le niveau 10 d\'upgrade conversion',
        icon: '🔄',
        reward: { honey: 200000 }
    },
    FLOWER_LOVER: {
        id: 'flower_lover',
        name: '🌸 Amoureux des Fleurs',
        description: 'Visite 1000 fleurs différentes',
        icon: '🌸',
        reward: { honey: 150000 }
    }
};

export const DAILY_QUESTS = {
    COLLECT_HONEY: {
        id: 'daily_collect_honey',
        name: '🍯 Collecte de Miel',
        description: 'Collecte 50000 miel',
        target: 50000,
        reward: { honey: 25000 }
    },
    SPAWN_BEES: {
        id: 'daily_spawn_bees',
        name: '🐝 Élevage',
        description: 'Crée 10 abeilles',
        target: 10,
        reward: { honey: 10000 }
    },
    COLLECT_POLLEN: {
        id: 'daily_collect_pollen',
        name: '🌸 Récolte',
        description: 'Collecte 100000 pollen',
        target: 100000,
        reward: { honey: 20000 }
    }
};

export const STORAGE_KEYS = {
    // Auth
    SAVED_EMAIL: 'beeSwarm_email',
    SAVED_PASSWORD: 'beeSwarm_password',
    REMEMBER_ME: 'beeSwarm_remember',
    CURRENT_USER: 'beeSwarm_currentUser',

    // Game state
    GAME_SAVE: 'beeSwarm_game',
    USER_GAME_SAVE: 'beeSwarm_userGame_',
    UPGRADES: 'beeSwarm_upgrades',
    USER_UPGRADES: 'beeSwarm_userUpgrades_',
    REBIRTH_DATA: 'beeSwarm_rebirth',

    // Settings
    SETTINGS: 'beeSwarm_settings',

    // User accounts
    USERS: 'beeSwarm_users',
    USERNAME: 'beeSwarm_username',
    USER_PASSWORD: 'beeSwarm_userPassword',
    USER_REMEMBER: 'beeSwarm_userRemember',

    // Achievements & Daily quests
    ACHIEVEMENTS: 'beeSwarm_achievements',
    DAILY_QUESTS: 'beeSwarm_dailyQuests',
    DAILY_QUESTS_RESET: 'beeSwarm_dailyQuestsReset'
};

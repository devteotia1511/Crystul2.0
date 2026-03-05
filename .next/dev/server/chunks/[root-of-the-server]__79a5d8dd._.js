module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/env-validation.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Environment Variable Validation
 * 
 * This utility validates that all required environment variables are present
 * and provides helpful error messages if any are missing.
 */ __turbopack_context__.s([
    "getOptionalEnvVar",
    ()=>getOptionalEnvVar,
    "getRequiredEnvVar",
    ()=>getRequiredEnvVar,
    "validateEnvironmentVariables",
    ()=>validateEnvironmentVariables,
    "validateEnvironmentVariablesOnStartup",
    ()=>validateEnvironmentVariablesOnStartup
]);
function validateEnvironmentVariables() {
    const requiredVars = [
        'NEXTAUTH_URL',
        'NEXTAUTH_SECRET',
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
        'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        'NEXT_PUBLIC_FIREBASE_APP_ID',
        'MONGODB_URI'
    ];
    const missingVars = [];
    const placeholderVars = [];
    for (const varName of requiredVars){
        const value = process.env[varName];
        if (!value) {
            missingVars.push(varName);
        } else if (value.includes('your-') || value.includes('placeholder')) {
            placeholderVars.push(varName);
        }
    }
    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
    // Only warn about placeholder values in development, don't throw
    if (placeholderVars.length > 0) {
        console.warn(`⚠️  Environment variables contain placeholder values: ${placeholderVars.join(', ')}. Please set actual values for production.`);
    }
}
function validateEnvironmentVariablesOnStartup() {
    if ("TURBOPACK compile-time truthy", 1) {
        // Only run on server-side
        try {
            validateEnvironmentVariables();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Environment validation failed:', errorMessage);
            // Don't throw in production to avoid breaking the app
            if ("TURBOPACK compile-time truthy", 1) {
                console.warn('⚠️  Continuing with placeholder values for development...');
            }
        }
    }
}
function getRequiredEnvVar(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is required but not set`);
    }
    // In development, allow placeholder values but warn
    if (value.includes('your-') || value.includes('placeholder')) {
        console.warn(`⚠️  Environment variable ${name} contains placeholder value. This will not work in production.`);
        // For development, return the placeholder value instead of throwing
        if ("TURBOPACK compile-time truthy", 1) {
            return value;
        }
    }
    return value;
}
function getOptionalEnvVar(name, defaultValue = '') {
    return process.env[name] || defaultValue;
}
}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2d$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/env-validation.ts [app-route] (ecmascript)");
;
;
const MONGODB_URI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2d$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRequiredEnvVar"])('MONGODB_URI');
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = {
        conn: null,
        promise: null
    };
    /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = cached;
}
async function dbConnect() {
    // In development, if MongoDB URI is a placeholder, skip connection
    if (("TURBOPACK compile-time value", "development") === 'development' && (MONGODB_URI.includes('your-') || MONGODB_URI.includes('placeholder'))) {
        console.warn('⚠️  Skipping MongoDB connection in development due to placeholder URI');
        return null;
    }
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, {
            bufferCommands: false
        }).then((mongoose)=>mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
const __TURBOPACK__default__export__ = dbConnect;
}),
"[project]/models/User.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const userSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: false // Make password optional for Google users
    },
    avatar: {
        type: String
    },
    bio: {
        type: String
    },
    skills: [
        {
            type: String
        }
    ],
    interests: [
        {
            type: String
        }
    ],
    experience: {
        type: String,
        enum: [
            'Beginner',
            'Intermediate',
            'Expert'
        ],
        default: 'Beginner'
    },
    lookingFor: [
        {
            type: String
        }
    ],
    location: {
        type: String
    },
    timezone: {
        type: String
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    connections: [
        {
            type: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('User', userSchema);
}),
"[project]/app/api/auth/[...nextauth]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/auth/[...nextauth]/route.ts
__turbopack_context__.s([
    "GET",
    ()=>handler,
    "POST",
    ()=>handler,
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/google.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2d$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/env-validation.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/User.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            clientId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2d$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRequiredEnvVar"])("GOOGLE_CLIENT_ID"),
            clientSecret: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2d$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRequiredEnvVar"])("GOOGLE_CLIENT_SECRET")
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                try {
                    const dbConnection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
                    // If no database connection (development with placeholder), allow demo login
                    if (!dbConnection) {
                        console.warn('⚠️  No database connection in development, allowing demo login');
                        // For development, allow any email/password combination
                        return {
                            id: 'demo-user',
                            email: credentials.email,
                            name: 'Demo User',
                            image: null
                        };
                    }
                    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                        email: credentials.email
                    });
                    if (!user) {
                        return null;
                    }
                    // Verify password
                    const isValidPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(credentials.password, user.password);
                    if (!isValidPassword) {
                        return null;
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        image: user.avatar
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async signIn ({ user, account, profile }) {
            if (account?.provider === 'google') {
                try {
                    const dbConnection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
                    if (dbConnection) {
                        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                            email: user.email
                        });
                        if (!existingUser) {
                            await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
                                name: user.name,
                                email: user.email,
                                avatar: user.image,
                                skills: [],
                                interests: [],
                                experience: 'Beginner',
                                lookingFor: [],
                                isPublic: true,
                                createdAt: new Date()
                            });
                        }
                    }
                } catch (err) {
                    console.error('Google sign-in user creation error:', err);
                    return false; // Prevents redirect to dashboard, shows error page
                }
            }
            return true;
        },
        async jwt ({ token, user, account }) {
            if (account && user) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session ({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
        async redirect ({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        }
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/"
    }
};
const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(authOptions);
;
 // No need to explicitly export authOptions again if it's already declared with 'export const'
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__79a5d8dd._.js.map
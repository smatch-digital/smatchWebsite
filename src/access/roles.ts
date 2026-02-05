import type { Access, FieldAccess } from 'payload'
import type { User } from '@/payload-types'

/**
 * Role hierarchy from lowest to highest permissions
 */
export const ROLE_HIERARCHY = ['viewer', 'editor', 'admin', 'owner'] as const
export type Role = (typeof ROLE_HIERARCHY)[number]

/**
 * Get the permission level of a role (higher = more permissions)
 */
export function getRoleLevel(role: Role | undefined): number {
    if (!role) return -1
    return ROLE_HIERARCHY.indexOf(role)
}

/**
 * Check if user has at least the specified minimum role level
 */
export function hasRole(user: User | null | undefined, minRole: Role): boolean {
    if (!user) return false
    const userRole = user.role as Role | undefined
    return getRoleLevel(userRole) >= getRoleLevel(minRole)
}

/**
 * Check if user is the Owner
 */
export function isOwner(user: User | null | undefined): boolean {
    return user?.role === 'owner'
}

/**
 * Check if user is Admin or higher
 */
export function isAdmin(user: User | null | undefined): boolean {
    return hasRole(user, 'admin')
}

/**
 * Check if user is Editor or higher
 */
export function isEditor(user: User | null | undefined): boolean {
    return hasRole(user, 'editor')
}

/**
 * Check if user is Viewer or higher (any authenticated user with a role)
 */
export function isViewer(user: User | null | undefined): boolean {
    return hasRole(user, 'viewer')
}

// ============================================================================
// COLLECTION ACCESS FUNCTIONS
// ============================================================================

/**
 * Only the Owner can perform this action
 */
export const ownerOnly: Access = ({ req }) => isOwner(req.user as User)

/**
 * Admin or higher can perform this action
 */
export const adminOrHigher: Access = ({ req }) => isAdmin(req.user as User)

/**
 * Editor or higher can perform this action
 */
export const editorOrHigher: Access = ({ req }) => isEditor(req.user as User)

/**
 * Any authenticated user can perform this action
 */
export const anyAuthenticated: Access = ({ req }) => Boolean(req.user)

// ============================================================================
// ADMIN PANEL ACCESS (Boolean only - for collection.access.admin)
// ============================================================================

/**
 * Admin panel access for Admin+ users (returns boolean only)
 */
export const adminPanelAdminOrHigher = ({ req }: { req: { user?: User | null } }): boolean => {
    return isAdmin(req.user)
}

/**
 * Admin panel access for Editor+ users (excludes viewers from admin)
 * This is the default for content collections
 */
export const adminPanelEditorOrHigher = ({ req }: { req: { user?: User | null } }): boolean => {
    return isEditor(req.user)
}

/**
 * Admin panel access for any authenticated user (returns boolean only)
 */
export const adminPanelAnyAuthenticated = ({ req }: { req: { user?: User | null } }): boolean => {
    return Boolean(req.user)
}

// ============================================================================
// USER COLLECTION SPECIFIC ACCESS
// ============================================================================

/**
 * Determines if a user can update another user:
 * - Owner can update anyone
 * - Admin can update non-owners
 * - Users can update their own profile
 */
export const canUpdateUser: Access<User> = ({ req }) => {
    const user = req.user as User | undefined
    if (!user) return false

    // Owner can update anyone
    if (user.role === 'owner') return true

    // Admin can update non-owners
    if (user.role === 'admin') {
        return {
            role: { not_equals: 'owner' },
        }
    }

    // Users can update their own profile
    return {
        id: { equals: user.id },
    }
}

/**
 * Determines if a user can delete another user:
 * - Owner can delete non-owners (owners cannot be deleted)
 * - Admin can delete editors and viewers only
 * - No one else can delete users
 */
export const canDeleteUser: Access<User> = ({ req }) => {
    const user = req.user as User | undefined
    if (!user) return false

    // Owner can delete anyone except other owners
    if (user.role === 'owner') {
        return {
            role: { not_equals: 'owner' },
        }
    }

    // Admin can delete editors and viewers only
    if (user.role === 'admin') {
        return {
            role: { in: ['editor', 'viewer'] },
        }
    }

    return false
}

// ============================================================================
// FIELD ACCESS FUNCTIONS
// ============================================================================

/**
 * Only owners can update the role field
 */
export const onlyOwnerCanUpdateRole: FieldAccess = ({ req }) => {
    return isOwner(req.user as User)
}

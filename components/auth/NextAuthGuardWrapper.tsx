import NextAuthGuard from '@/lib/NextAuthGuard'
import React, { Suspense } from 'react'

const NextAuthGuardWrapper = ({ children, requiredPermissions }: { children: React.ReactNode, requiredPermissions?: string[] } ) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {/* <NextAuthGuard requiredPermissions={requiredPermissions}> */}
                {children}
            {/* </NextAuthGuard> */}
        </Suspense>
    )
}

export default NextAuthGuardWrapper

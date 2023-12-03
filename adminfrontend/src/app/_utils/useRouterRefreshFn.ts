"use client"
import { useRouter } from "next/navigation"


export const useRouterRefreshFn = async () => {

    const router = useRouter();

    await router.refresh()
    await router.refresh()
    router.replace('admin/users')



}
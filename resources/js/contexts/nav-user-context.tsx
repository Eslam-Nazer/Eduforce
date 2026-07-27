import type { ComponentType, ReactNode} from 'react';
import  { useContext } from 'react';
import { createContext } from 'react';

type NavUserMenuContent = ComponentType<{ user: any }>;

const NavUserContext = createContext<NavUserMenuContent | null>(null);

export function NavUserProvider({
    menuContent,
    children,
}: {
    menuContent: NavUserMenuContent;
    children: ReactNode;
}) {
    return (
        <NavUserContext.Provider value={menuContent}>
            {children}
        </NavUserContext.Provider>
    );
}

export default function useNavUserContent() {
    const menuContent = useContext(NavUserContext);

    if (!menuContent) {
        throw new Error(
            'useNavUserMenuContent must be used within a NavUserProvider',
        );
    }

    return menuContent;
}

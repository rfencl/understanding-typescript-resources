import { type ReactNode } from 'react';

interface HeaderProps {
    image: {
        src: string;
        alt: string;
    };
    children?: ReactNode;
    // children?: React.ReactNode; // alternative way to type children
}


export default function Header({ image, children }: HeaderProps) {
    return (<header>
        <img {...image} />
        {children}
    </header>
    );
}
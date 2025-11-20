interface Cast {
    id: number;
    gender: number;
    name: string;
    original_name: string;
    character: string;
    profile_path: string
}

interface Crew {
    id: number;
    gender: number;
    name: string;
    original_name: string;
    profile_path: string
}

export interface Credits {
    id: number;
    cast: Cast[];
    crew: Crew[]
}
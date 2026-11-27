export interface Exercise {
    id: string;
    name: string;
    description: string;
    instructions: string[];
    tips: string[];
    category: string;
    difficulty: string;
    equipment?: string;
    body_part: string;
    primary_muscles?: string[];
    secondary_muscles?: string[];
    is_bodyweight: boolean;
    images: {
        flat: string[];
    };
}
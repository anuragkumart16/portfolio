export type Audience = 'general' | 'company' | 'freelance';

export interface AudienceContextType {
    audience: Audience;
    setAudience: (audience: Audience) => void;
}

export type Theme = 'light' | 'dark';

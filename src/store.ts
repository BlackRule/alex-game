import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {devtools, persist} from 'zustand/middleware'

export type Language = 'ru' | 'en';

interface State {
    language: Language
    set: (l:Language) => void
}

export const useStore = create<State>()(
    devtools(
        persist(
            immer((set) => ({
                language: 'ru',
                set: (l:Language) =>
                    set((state) => {state.language=l}),
            })),
            {
                name: 'storage',
            }
        )
    )
)



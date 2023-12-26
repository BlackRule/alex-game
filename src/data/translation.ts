import {Language} from "src/store.ts";

type Translation={
    reviews:string,

}

export const translation:Record<Language, Translation>={
    en: {
        reviews: "reviews"
    },
    ru: {
        reviews: "отзывы"
    }

}
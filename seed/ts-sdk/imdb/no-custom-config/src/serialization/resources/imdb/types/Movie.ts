/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as SeedApi from "../../../../api";
import * as core from "../../../../core";
import { MovieId } from "./MovieId";

export const Movie: core.serialization.ObjectSchema<serializers.Movie.Raw, SeedApi.Movie> = core.serialization.object({
    id: core.serialization.property("_id", MovieId),
    movieTitle: core.serialization.property("movie_title", core.serialization.string()),
    movieRating: core.serialization.property("movie_rating", core.serialization.number()),
});

export declare namespace Movie {
    interface Raw {
        _id: MovieId.Raw;
        movie_title: string;
        movie_rating: number;
    }
}

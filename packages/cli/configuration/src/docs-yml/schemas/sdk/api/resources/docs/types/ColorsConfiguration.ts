/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernDocsConfig from "../../../index";

export interface ColorsConfiguration {
    /**
     * The primary accent color is used for buttons, links, and other interactive elements.
     *
     * @default: #818CF8
     */
    accentPrimary?: FernDocsConfig.ColorConfig;
    /** Use `accent-primary` instead. */
    accentPrimaryDeprecated?: FernDocsConfig.ColorConfig;
    /**
     * The background color is used for the main background of the docs site.
     *
     * @default:
     * dark: #111111
     * light: #F9F9F9
     *
     * If not set, there will be also be a vertical gradient from the top using the accent primary color with 5% opacity.
     */
    background?: FernDocsConfig.ColorConfig;
    /**
     * The border color is used for the borders of cards and other elements.
     *
     * @default:
     * dark: black/12%
     * white: white/13%
     */
    border?: FernDocsConfig.ColorConfig;
    /**
     * If `sidebarBackground` is not set, the sidebar will render with a transparent background without a border.
     * If `sidebarBackground` is set, the sidebar will also render a 1px border on the right side.
     */
    sidebarBackground?: FernDocsConfig.ColorConfig;
    /**
     * If `headerBackground` is not set, the header will render with a transparent background, with a 1px faded border on the bottom.
     * If `headerBackground` is set, the header will render with a solid background, with a 1px solid border on the bottom.
     */
    headerBackground?: FernDocsConfig.ColorConfig;
    /**
     * This is the background color of cards and code blocks.
     *
     * @default:
     * dark: white/3.5%
     * light: white/70%
     */
    cardBackground?: FernDocsConfig.ColorConfig;
}

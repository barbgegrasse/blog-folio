import css from '@emotion/css';
import dimensions from "styles/dimensions";

const typeStyles = css`
    h1 {
        font-size: 3.7em;
        line-height: 1.45;
        font-weight: 200;
        font-family: 'IBM Plex Mono', monospace;
        font-weight: 200;

        @media(max-width:${dimensions.maxwidthTablet}px) {
            font-size: 2.25em;
        }

        @media(max-width:${dimensions.maxwidthMobile}px) {
            font-size: 2em;
        }
    }

    h2 {
        margin-bottom: 2rem;
        font-size: 1.9em;
        line-height: 1.1;
        font-family: 'IBM Plex Mono', monospace;
        font-weight: 200;
    }

    h3 {
        line-height: 1.2;
        font-size: 1.5em;
        font-family: 'IBM Plex Mono', monospace;
        font-weight: 200;
    }

    h5 {
        margin-bottom: 1.45rem;
        font-weight: 500;
        line-height: 20px;
        font-size: 0.95em;
        font-family: 'IBM Plex Mono', monospace;
        font-weight: 200;
    }

    h6 {
        font-size: 0.9em;
        font-weight: 500;
        margin: 0;
        font-family: 'IBM Plex Mono', monospace;
        font-weight: 200;
    }

    p {
        line-height: 1.9;
    }

    a {
        &:hover {
            cursor: pointer;
        }
    }
`

export default typeStyles;
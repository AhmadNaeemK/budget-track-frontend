import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        //globals
        --black: #0a0a0a;
        --darkGrey: #1f1f1f;
        --medGrey: #404040;
        --lightGrey: #707070;
        --lighterGrey: #e8e8e8;
        --white: #fff;
        --green: #9eff66
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2 rem;
        --fontSmall: 1rem;
        
        //sidebar-icons
        
    }

    * {
        font-family: 'Montserrat' , sans-serif;
    }

    body {
        margin: 0;
        padding: 0;
        background: var(--darkGrey);
        color: white;
    }

    .green {
        background-color: var(--green)
    }

    .modal {
        color: black;
    }

`;
import css from '@emotion/css'
import colors from 'styles/colors'
import dimensions from 'styles/dimensions'

const globalStyles = css`
  html,
  body,
  #root {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
  }

  body {
    width: 100%;
    margin: 0 auto;
    font-size: 24px;
    font-family: 'Roboto Mono';
    line-height: 1.5;
    background-color: ${colors.grey900};
    color: ${colors.white100};
    -webkit-font-smoothing: antialiased;

    @media (max-width: ${dimensions.maxwidthMobile}px) {
      font-size: 14px;
    }

    * {
      box-sizing: border-box;

      &::selection {
        background: ${colors.orange500};
        color: white;
      }
    }
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-bottom: 1rem;
    li {
      display: list-item;
      margin-left: 1.5rem;
      list-style-type: square;
    }
  }

  pre {
    margin-bottom: 1rem;
  }

  .hn-title {
    margin-bottom: 1.5rem;
    font-weight: bold;
  }

  /*
    A workaround for forcing accessibility wrappers
    to have a 100% height.
    Reach Router issue here: https: //github.com/reach/router/issues/63
    */
  #___gatsby,
  div[role='group'][tabindex] {
    height: 100%;
    min-height: 100% !important;
  }
`

export default globalStyles

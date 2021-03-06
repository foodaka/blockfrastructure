import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Section, Container } from '@components/global';
import ExternalLink from '@common/ExternalLink';
import { Link } from 'gatsby';

import { ReactComponent as KusamaLogo } from '@images/logos/kusama.svg';
import { ReactComponent as CosmosLogo } from '@images/logos/cosmos.svg';

const LOGOS = [
  {
    logo: KusamaLogo,
    link: 'https://kusama.network/',
    page: 'Kusama',
  },
  {
    logo: CosmosLogo,
    link: 'https://cosmos.network/',
    page: 'stake-cosmos',
  },
];

const Staked = () => (
  <StaticQuery
    query={graphql`
      query {
        art_story: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "tell_story" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        kusama_logo: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "kusama" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <Section id="networks" accent>
        <StyledContainer>
          <div>
            <h1>Currently Staking on</h1>
            <LogoGrid>
              {LOGOS.map(({ logo, link, page }) => {
                if (page === 'Kusama') { //TODO: remove quick and dirty
                  return (
                    <ExternalLink
                      href={link}
                      style={{
                        padding: '10px',
                        height: '200px',
                        width: '200px',
                        borderRadius: '50%',
                        border: '2px solid white',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                      key={link}
                    >
                      {logo()}
                    </ExternalLink>
                  )
                }
                return (
                  <Link
                    to={`/blog/${page}`}
                    style={{
                      padding: '10px',
                      height: '200px',
                      width: '200px',
                      borderRadius: '50%',
                      border: '2px solid white',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                    key={link}
                  >
                    {logo()}
                  </Link>
                )
              })}
            </LogoGrid>
          </div>
          <Art>
            <Img fluid={data.art_story.childImageSharp.fluid} />
          </Art>
        </StyledContainer>
      </Section>
    )}
  />
);

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 64px;
  justify-items: center;
  margin-top: 96px;

  a {
    svg {
      width: 100%;
    }
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: flex-end;
  position: relative;

  @media (max-width: ${props => props.theme.screen.md}) {
    justify-content: center;
  }
`;

const Art = styled.figure`
  width: 600px;
  position: absolute;
  top: -12%;
  right: 60%;

  @media (max-width: ${props => props.theme.screen.lg}) {
    top: 0;
    right: 65%;
    width: 500px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    display: none;
  }
`;

export default Staked;

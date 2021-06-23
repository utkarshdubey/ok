import styled from "styled-components";

const InfoBox = ({ title, isLink }) => {
  return (
    <div>
      <Box>
        <Text>
          {isLink ? (
            <A href={title} target="_blank">
              { title }
            </A>
          ) : (
            <p>{ title }</p>
          )}
        </Text>
      </Box>
    </div>
  );
};

const Box = styled.div`
  background-color: var(--background-grey);
  padding: 0px 50px;
  border-radius: 50px;
  display: inline-block;
  text-align: center;
  user-select: none;
`;
const Text = styled.span`
  color: var(--primary-grey);
  font-weight: bold;
  font-size: 0.7rem;
  text-transform: uppercase;
  margin: 7.5px 5px 5px 6px;
  letter-spacing: ${props => props.isLink ? null : "10px"};
`;

const A = styled.a`
  text-decoration: none;
  color: white;
`;

export default InfoBox;

import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export const Button = styled.button`
  font-size: 16px;
  color: #171d1f;
  font-weight: 600;
  padding: 8px 16px;
  border: none;
  background-color: #daff7e;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${(props) =>
    props.$secondary &&
    css`
      color: #daff7e;
      background-color: #171d1f;
    `}
`;

Button.propTypes = {
  $secondary: PropTypes.bool,
};

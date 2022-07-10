import React from 'react';
import styled from 'styled-components';
import LoginPage from './pages/LoginPage';

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	background-color: #f5f5f5;
`;

function App() {
	return (
		<Wrapper>
			<LoginPage />
		</Wrapper>
	);
}

export default App;

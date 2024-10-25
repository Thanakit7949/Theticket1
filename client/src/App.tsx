// App.tsx
import './App.css';
import Router from './router';
import { Container, Typography } from '@mui/material';

function App() {
  console.log("App component rendered");
  return (
    <Container>
      {/* <Typography variant="h4" gutterBottom>
        Welcome to My App
      </Typography> */}
      <Router /> 
    </Container>
  );
}

export default App;

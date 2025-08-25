import { useState } from 'react';
import Header from './components/Header.tsx';
import goalsImage from './assets/goals.jpg';
import CourseGoals from './components/CourseGoals.tsx';
import NewGoal from './components/NewGoal.tsx';


function App() {
  const [goals, setGoals] = useState(  [{ id: 1, title: 'Learn TS', description: 'Learn TS with from the ground up' },
        { id: 2, title: 'Learn React', description: 'Learn React with TS' },
          { id: 3, title: 'Learn Node.js' }
  ]);

  function handleDeleteGoal(goalId: number) {
    console.log('Goal deleted with id:', goalId);
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));  
  }

  function handleAddGoal(text: string, summary: string) {
    const newGoal = {
        id: Math.floor(Math.random() * 10000), // simple id generation
        title: text,
        description: summary,
    };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  } 

    return (
    <main>
        <Header image={{ src: goalsImage, alt: 'A list of goals' }}>
            <h1>Your Course Goals</h1>
        
        </Header>
        <NewGoal onAddGoal={handleAddGoal}/>
        <CourseGoals goals={goals} onDelete={handleDeleteGoal} />
        </main>
  );
}       

export default App

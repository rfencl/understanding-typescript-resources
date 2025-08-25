import { useRef, type FormEvent } from 'react';

interface NewGoalProps {
    onAddGoal: (text: string, summary: string) => void;
}   

export default function NewGoal({ onAddGoal }: NewGoalProps) {
    const goalRef = useRef<HTMLInputElement>(null);
    const summaryRef = useRef<HTMLInputElement>(null);


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const enteredGoal = goalRef.current!.value;
        const enteredSummary = summaryRef.current!.value;

        //validation
        if (enteredGoal.trim().length === 0 || enteredSummary.trim().length === 0) {
            return;
        }   
        onAddGoal(enteredGoal, enteredSummary);
        //alternative way to get form values without useRef
         const form = event.target as HTMLFormElement;
        // const goalInput = form.elements.namedItem('goal') as HTMLInputElement;
        // const summaryInput = form.elements.namedItem('summary') as HTMLInputElement;
        // const newGoal = {
        //     id: Math.floor(Math.random() * 10000), // simple id generation
        //     title: goalInput.value,
        //     description: summaryInput.value,
        // };
        // console.log('New Goal:', newGoal);
         form.reset();
    }

    return (
        <form onSubmit={ handleSubmit}>
            <p>
                <label htmlFor="goal">Your goal</label>
                <input type="text" id="goal" ref={goalRef}/>
            </p>
            <p>
                <label htmlFor="summary">Short summary</label>
                <input type="text" id="summary" ref={summaryRef}/>
            </p>
            <p>
                <button>Add Goal</button>
            </p>
        </form>
    ); 
    
}
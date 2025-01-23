import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { FlashCard } from './FlashCard';
import { fetchFlashcards, Flashcard } from '../services/api';

type ScreenOneProps = {
    route: RouteProp<MainStackParamList, "One">,
    navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
    const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        loadFlashcards();
    }, []);

    const loadFlashcards = async () => {
        const cards = await fetchFlashcards();
        setFlashcards(cards);
    };

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <flexboxLayout className="bg-gray-900 h-full">
            {flashcards.length > 0 ? (
                <stackLayout className="h-full">
                    <FlashCard card={flashcards[currentIndex]} />
                    <flexboxLayout className="justify-center p-4">
                        <button 
                            className="bg-blue-600 text-white p-4 rounded-lg mx-2" 
                            onTap={handlePrevious}
                            isEnabled={currentIndex > 0}
                        >
                            Previous
                        </button>
                        <button 
                            className="bg-blue-600 text-white p-4 rounded-lg mx-2" 
                            onTap={handleNext}
                            isEnabled={currentIndex < flashcards.length - 1}
                        >
                            Next
                        </button>
                    </flexboxLayout>
                </stackLayout>
            ) : (
                <activityIndicator busy={true} className="text-white" />
            )}
        </flexboxLayout>
    );
}
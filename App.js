import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [courseGoals, setCourseGoals] = useState([]);

    function startAddGoalHadler() {
        setModalIsVisible(true);
    }

    function endAddGoalHadler() {
        setModalIsVisible(false);
    }

    function addGoalHandler(enteredGoalText) {
        setCourseGoals((currentCourseGoals) => [
            ...currentCourseGoals,
            { text: enteredGoalText, id: Math.random().toString() },
        ]);
        endAddGoalHadler();
    }

    function deleteGoalHandler(id) {
        setCourseGoals(currentCourseGoals => {
            return currentCourseGoals.filter((goal) => goal.id !== id)
        });
    }

    return (
        <>
            <StatusBar style='light' />
            <View style={styles.appContainer}>
                <Button
                    title="Add New Goal"
                    color="#a065ec"
                    onPress={startAddGoalHadler}
                />
                <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHadler} />
                <View style={styles.goalsContainer}>
                    <FlatList
                        data={courseGoals}
                        renderItem={(itemData) => {
                            return (
                                <GoalItem
                                    text={itemData.item.text}
                                    id={itemData.item.id}
                                    onDeleteItem={deleteGoalHandler}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => {
                            return item.id;
                        }}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: '#1e085a'
    },
    goalsContainer: {
        flex: 4,
    }
});

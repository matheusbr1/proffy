import React, { useState } from "react";
import { View, Text } from "react-native";

import PageHeader from "../../components/PageHeader";

import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from "react-native-gesture-handler";
import api from "../../Services/api";

import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

function TeacherList() {
  const [filterVisible, setFilterVisible] = useState(false);

  const [favorites, setFavorites] = useState<number[]>([]);

  const [teachers, setTeachersList] = useState([]);

  const [subject, setSubject] = useState();
  const [week_day, setWeek_day] = useState();
  const [time, setTime] = useState();

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIDs = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );
        setFavorites(favoritedTeachersIDs);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  async function HandleFiltersSubmit() {
    loadFavorites();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setTeachersList(response.data);
    setFilterVisible(false);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys Disponíveis"
        headerRight={
          <BorderlessButton onPress={() => setFilterVisible(!filterVisible)}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {filterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria?"
              value={subject}
              onChangeText={(text) => setSubject(text)}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia?"
                  value={week_day}
                  onChangeText={(text) => setWeek_day(text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual horário?"
                  value={time}
                  onChangeText={(text) => setTime(text)}
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={HandleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default TeacherList;

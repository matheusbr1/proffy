import React, { useState, FormEvent } from "react";
import "./styles.css";
import PageHeader from "../../components/Page-header";

import TeacherItem, { Teacher } from "../../components/TeacherItem";

import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeek_day] = useState("");
  const [time, setTime] = useState("");

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    // console.log({
    //   subject,
    //   week_day,
    //   time
    // })

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);

    console.log(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            label="Matéria"
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação física", label: "Educação física" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
              { value: "Química", label: "Química" },
            ]}
          />
          <Select
            value={week_day}
            onChange={(e) => {
              setWeek_day(e.target.value);
            }}
            name="week_day"
            label="Dia da semana"
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            name="time"
            type="time"
            label="Hora"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />

          <button type="submit"> Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}

        {/* <TeacherItem teacher={{
          id: 1,
          name: 'Matheus Baron',
          subject: 'Química',
          bio: 'Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências.',
          cost: 80,
          whatsapp: '11978035721',
          avatar: 'https://avatars1.githubusercontent.com/u/28275815?s=460&u=07b68060e0c143581888029bef65ac1496406262&v=4'
        }} /> */}
      </main>
    </div>
  );
};

export default TeacherList;

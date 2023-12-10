import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IDay } from "./DayList";
import Word, { IWord } from "./Word";
import { useState } from "react";

export default function Day() {
  const { day } = useParams<{ day: string }>();
  const days: IDay[] = useFetch("http://localhost:3001/days");
  const words: IWord[] = useFetch(`http://localhost:3001/words?day=${day}`);
  const [isShownAll, setIsShownAll] = useState<boolean | null>(null);

  return (
    <>
      <h2>Day {day}</h2>
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word
              word={word}
              isShownAll={isShownAll}
              setIsShownAll={setIsShownAll}
              key={word.id}
            />
          ))}
        </tbody>
      </table>
      <br />
      <button
        onClick={() => {
          setIsShownAll(true);
        }}
        style={{ width: "47%", backgroundColor: "green" }}
      >
        전체 뜻 보기
      </button>
      <button
        onClick={() => {
          setIsShownAll(false);
        }}
        style={{ float: "right", width: "47%", backgroundColor: "orange" }}
      >
        전체 뜻 숨기기
      </button>
      <br />
      <br />
      {Number(day) - 1 > 0 && (
        <Link to={`/day/${Number(day) - 1}`} className="link">
          <button style={{ backgroundColor: "grey" }}>이전 Day</button>
        </Link>
      )}
      {Number(day) + 1 <= days.length && (
        <Link to={`/day/${Number(day) + 1}`} className="link">
          <button style={{ float: "right", backgroundColor: "grey" }}>
            다음 Day
          </button>
        </Link>
      )}
    </>
  );
}

import Head from "next/head";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (server: Date, client: Date) => {
  // Calcutate time between two given dates
  return {
    difference: {
      day: Math.abs(server.getDay() - client.getDay()),
      hour: Math.abs(server.getHours() - client.getHours()),
      minutes: Math.abs(server.getMinutes() - client.getMinutes()),
      seconds: Math.abs(server.getSeconds() - client.getSeconds())
    }
  }
};

Home.getInitialProps = () => {
  // Get the server's time
  const serverTime = new Date();
  return {
    props: {
      serverTime
    }
  }
}

export default function Home() {
  const router = useRouter();
  const [browserTime, setBrowserTime] = useState(new Date());
  const moveToTaskManager = () => {
    router.push("/tasks");
  }
  useEffect(() => {
    // Sets the browser's time
      const currentTime = new Date();
      setBrowserTime(currentTime);
  }, [])
  //Invoking getInitialProps() to get the server's time
  const serverTime = Home.getInitialProps().props.serverTime;
  //Split server time for rendering
  const serverTimeValue = {
    date:  String(serverTime.getDate()).padStart(2, '0'),
    month: String(serverTime.getMonth()+1).padStart(2, '0'),
    year: serverTime.getFullYear(),
    hour: serverTime.getHours(),
    minutes: serverTime.getMinutes()
  }
  const timeDifference = calculateTimeDifference(serverTime, browserTime).difference;
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">
              {serverTimeValue.date}-{serverTimeValue.month}-{serverTimeValue.year} {serverTimeValue.hour}:{serverTimeValue.minutes}
            </span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{timeDifference.day} days {timeDifference.hour} hours {timeDifference.minutes} minutes {timeDifference.seconds} seconds</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
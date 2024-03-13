import { useState, useEffect } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

function App() {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = JSON.parse(window.localStorage.getItem("saved-clicks"));
    return savedClicks ? savedClicks : { good: 0, neutral: 0, bad: 0 };
  });

  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;
  const positiveFeedback = Math.round(
    ((clicks.good + clicks.neutral) / totalFeedback) * 100
  );

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      return setClicks({ good: 0, neutral: 0, bad: 0 });
    }

    setClicks({ ...clicks, [feedbackType]: clicks[feedbackType] + 1 });
  };

  useEffect(() => {
    window.localStorage.setItem("saved-clicks", JSON.stringify(clicks));
  }, [clicks]);

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      {totalFeedback === 0 && <Notification />}
      <Feedback
        good={clicks.good}
        neutral={clicks.neutral}
        bad={clicks.bad}
        totalFeedback={totalFeedback}
        positiveFeedback={positiveFeedback}
      />
    </>
  );
}

export default App;

import { ConfessionPie } from "./ConfessionsPie";

const Home: React.FC = () => (
  <div>
    <p>Welcome to the home of the Justice Department of Fakelandia.</p>
    <p>
      Here you can browse a list of recent misdemeanours committed by our
      citizens, or you can confess to your misdemeanour.
    </p>
    <ConfessionPie/>
  </div>
);

export default Home;

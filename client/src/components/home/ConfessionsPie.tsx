export const ConfessionPie: React.FC = () => {
  return (
    <div>
      <h2 className="pie-heading">Confessions reported this month</h2>
      <div className="pie-wrapper">
        <div className="pie-wrap">
          <div className="sky-blue entry">
            <p>50%</p>
            <p className="entry-value">Talk</p>
          </div>

          <div className="orange entry">
            <p>12.5%</p>
            <p className="entry-value">Vegetables</p>
          </div>

          <div className="purple entry">
            <p> 12.5%</p>
            <p className="entry-value">Rudeness</p>
          </div>

          <div className="green entry">
            <p> 12.5%</p>
            <p className="entry-value">United</p>
          </div>

          <div className="wheat entry">
            <p> 12.5%</p>
            <p className="entry-value">Lift</p>
          </div>
        </div>

        <div className="key-wrap">
          <input type="radio" name="values" id="talk" className="talk-key" />
          <label htmlFor="talk" className="talk-label">
            Talk
          </label>

          <input
            type="radio"
            name="values"
            id="vegetables"
            className="vegetables-key"
          />
          <label htmlFor="vegetables" className="vegetables-label">
            Vegetables
          </label>

          <input type="radio" name="values" id="lift" className="lift-key" />
          <label htmlFor="lift" className="lift-label">
            Lift
          </label>

          <input
            type="radio"
            name="values"
            id="rudeness"
            className="rudeness-key"
          />
          <label htmlFor="rudeness" className="rudeness-label">
            Rudeness
          </label>

          <input
            type="radio"
            name="values"
            id="united"
            className="united-key"
          />
          <label htmlFor="united" className="united-label">
            United
          </label>

          <p className="talk-text text">50% of citizens just wanted to talk</p>
          <p className="vegetables-text text">
            12.5% did not eat their vegetables
          </p>
          <p className="lift-text text">12.5% spoke in a lift </p>
          <p className="rudeness-text text">12.5% engaged in mild rudeness</p>
          <p className="united-text text">
            12.5% started supporting Manchester United
          </p>
        </div>
      </div>
    </div>
  );
};

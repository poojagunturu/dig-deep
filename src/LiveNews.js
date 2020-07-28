import React from "react";
import { Card, Feed } from "semantic-ui-react";

function LiveNews() {
  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header>
            <h4>LATEST NEWS</h4>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
              <Feed.Content>
                <Feed.Date content="1 day ago" />
                <Feed.Summary>
                  You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/molly.png" />
              <Feed.Content>
                <Feed.Date content="3 days ago" />
                <Feed.Summary>
                  You added <a>Molly Malone</a> as a friend.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
              <Feed.Content>
                <Feed.Date content="4 days ago" />
                <Feed.Summary>
                  You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
              <Feed.Content>
                <Feed.Date content="4 days ago" />
                <Feed.Summary>
                  You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
              <Feed.Content>
                <Feed.Date content="4 days ago" />
                <Feed.Summary>
                  You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>
            <h4>LATEST TWEETS</h4>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
              <Feed.Content>
                <Feed.Date content="1 day ago" />
                <Feed.Summary>
                  You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/molly.png" />
              <Feed.Content>
                <Feed.Date content="3 days ago" />
                <Feed.Summary>
                  You added <a>Molly Malone</a> as a friend.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
              <Feed.Content>
                <Feed.Date content="4 days ago" />
                <Feed.Summary>
                  You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
              <Feed.Content>
                <Feed.Date content="4 days ago" />
                <Feed.Summary>
                  You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
              <Feed.Content>
                <Feed.Date content="4 days ago" />
                <Feed.Summary>
                  You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
              <Feed.Content>
                <Feed.Date content="4 days ago" />
                <Feed.Summary>
                  You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

export default LiveNews;

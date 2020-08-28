import React, { Component } from 'react';

class Comment extends Component {
  // display date
  handleSetDate = (commentDate) => {
    // current date
    var today = new Date();
    var currMonth = today.getMonth() + 1;
    var currDate = today.getDate();

    var month = commentDate.slice(5, 7);
    var date = commentDate.slice(8, 10);
    var hour = commentDate.slice(11, 13);
    var minute = commentDate.slice(14, 16);

    if (month.slice(0, 1) === '0') {
      month = month.slice(1, 2);
    }
    if (date.slice(0, 1) === '0') {
      date = date.slice(1, 2);
    }

    if (currDate.toString() === date && currMonth.toString() === month) {
      let finalDate = 'Today at' + ' ' + hour + ':' + minute;
      return finalDate;
    } else {
      var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      let finalDate =months[month - 1] + ' ' + date + ' at ' + hour + ':' + minute;
      return finalDate;
    }
  };

  render() {
    const { comment } = this.props;
    return (
      <div className="post-comment-item">
        <div className="post-comment-header">
          <span className="post-comment-author">{comment.user.name}</span>
          <span className="post-comment-time">
            {this.handleSetDate(comment.createdAt)}
          </span>
          <span className="post-comment-likes">
            <button className="comment-like no-btn">
              <img
                src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
                alt="like comment"
              />
              <span>{comment.likes.length}</span>
            </button>
          </span>
        </div>
        <div className="post-comment-content">{comment.content}</div>
      </div>
    );
  }
}

export default Comment;
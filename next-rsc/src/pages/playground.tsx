import { useEffect } from 'react';

export default function Playground() {
  useEffect(() => {
    window.addEventListener('beforeunload', function (event) {
      event.preventDefault();
      // event.returnValue = ''; // 为了兼容性，需要返回一个值
      // 在这里添加保存用户编辑内容的代码
      // 或者添加提示用户的代码
      const message = '您还有未保存的修改，确定离开吗？';
      // event.returnValue = message; // 在返回值中指定提示信息
      // if (confirm(message)) {
      // 在这里添加保存修改的代码
      // } else {
      // 在这里添加取消的代码
      // }
      // return message;
      navigator.sendBeacon('report.qq.com', 'a=1&b=2');
    });
  }, []);

  return (
    <div>
      <h1>Plaground</h1>
    </div>
  );
}

import Keyv from 'keyv';
const birthdays = new Keyv('sqlite://birthdays.sqlite'); // SQLiteファイルに保存

// 誕生日を保存（例: ユーザーID "123456789" の誕生日を "06-15" で登録）
(async () => {
  await birthdays.set('763328370003148801', '03-15');
})();


// 誕生日を取得
(async () => {
  const birthday = await birthdays.get('763328370003148801');
  console.log(birthday); // "06-15"
})();


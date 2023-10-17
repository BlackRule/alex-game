import 'dart:io';
void main(List<String> arguments) async {

  Directory.current = new Directory(arguments[0]);
  var dir=await Directory(arguments[1]).create();
  Directory.current = dir;
  File('${arguments[1]}.tsx').writeAsString(
'import styles from \'./${arguments[1]}.module.scss\'\n\n\nexport default ${arguments[1]}');
  File('${arguments[1]}.module.scss').writeAsString('\n');
}
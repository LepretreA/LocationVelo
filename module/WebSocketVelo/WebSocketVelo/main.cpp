
#include <QtSerialPort/QSerialPort>
#include <QDebug>
#include <QtSql/QtSql>
#include <iostream>
#include "MyWebSocketServer.h"


int main(int argc, char* argv[])
{
	QCoreApplication a(argc, argv);
	MyWebSocketServer MyWebSocketServer;
	return a.exec();
}
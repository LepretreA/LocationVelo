
#include <QObject>
#include <QSerialPort>
#include <QtSql/QSqlDatabase>

class MyWebSocketServer : public QObject
{
    Q_OBJECT

public:
    explicit MyWebSocketServer(QObject* parent = nullptr);

private slots:
    void onReadyRead();
  
    void insertDataIntoDatabase(const QString& latitudeStr, const QString& longitudeStr);


private:
    QSqlDatabase m_database;
    QSerialPort m_serialPort;
    QByteArray m_trame;
    int m_insertionCount;
};


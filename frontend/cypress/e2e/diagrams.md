+---------------------+       +-----------------+        +---------------------+
|     LogComponent    |       |      LogEntry   |        |         Log         |
+---------------------+       +-----------------+        +---------------------+
| - logData: Log       |       | - log: Log       |        | - id: number         |
| - logs: Log[]        |       |                 |        | - entry_id: number   |
| - markedDates: Date[]|       |                 |        | - date: string       |
| - selectedDate: Date |       |                 |        | - content: string    |
| - selectedLogId: Log |       |                 |        | - symptoms: string   |
|                     |       |                 |        | - meal: string       |
| + handleChange()    |       | + handleClick() |        +---------------------+
| + resetForm()       |       | + handleDelete()|
| + handleSubmit()    |       |                 |
| + fetchLogs()       |       +-----------------+
| + fetchMarkedDates()|
| + useEffect()       |
| + tileContent()     |
| + onClickDay()      |
| + onSelectLog()     |
| + onDeleteLog()     |
+---------------------+

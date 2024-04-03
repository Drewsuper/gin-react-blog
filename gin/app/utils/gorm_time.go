package utils

import (
	"database/sql/driver"
	"fmt"
	"time"
)

const (
	tmFmtWith = "2006-01-02 15:04:05"
	tmFmtZero = "0000-00-00 00:00:00"
	nullStr   = "NULL"
)

type MyTime time.Time

func (t *MyTime) MarshalJSON() ([]byte, error) {
	tTime := time.Time(*t)
	return []byte(fmt.Sprintf("\"%v\"", tTime.Format("2006-01-02 15:04:05"))), nil
}

func (t MyTime) Value() (driver.Value, error) {
	var zeroTime time.Time
	tlt := time.Time(t)
	if tlt.UnixNano() == zeroTime.UnixNano() {
		return nil, nil
	}
	return tlt, nil
}

func (t *MyTime) Scan(v interface{}) error {
	if value, ok := v.(time.Time); ok {
		*t = MyTime(value)
		return nil
	}
	return fmt.Errorf("can not convert %v to timestamp", v)
}

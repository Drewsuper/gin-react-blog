package cache

import (
	"context"
)

func GetValueKey(key string) (interface{}, error) {
	data, err := Redis.Get(context.Background(), key).Result()
	if err != nil {
		return nil, err
	} else {
		return data, nil
	}
}

func SetValue(key string, value interface{}) error {
	err := Redis.Set(context.Background(), key, value, 0)
	return err.Err()
}

func DeleteKey(key string) error {
	_, err := Redis.Del(context.Background(), key).Result()
	return err
}

//func SetValueEx(key string, value any) error {
//
//}

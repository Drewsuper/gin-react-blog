package config

import (
	"flag"
	"github.com/spf13/viper"
	"log"
	"time"
)

type ConfigData struct {
	Host  string `yaml:"Host"`
	Port  string `yaml:"Port"`
	Mysql struct {
		DataSource string `yaml:"DataSource"`
	} `yaml:"mysql"`
	JWT struct {
		Secret string `yaml:"Secret"`
	} `yaml:"JWT"`
	Redis struct {
		Addr string `yaml:"Addr"`
		PWD  string `yaml:"password"`
		DB   int    `yaml:"DB"`
	} `yaml:"redis"`
}

var Config *ConfigData
var fileOpen = flag.String("f", "app/etc/config.yaml", "the config file")

func InitConfig() error {
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	//viper.SetConfigName("config")
	//viper.SetConfigType("yaml")
	//viper.AddConfigPath("./app/etc/")
	viper.SetConfigFile(*fileOpen)
	log.Printf("\u001B[0;33m[Config]: config file is initializing...\033[0m")
	time.Sleep(5 * time.Second)
	err := viper.ReadInConfig()
	if err != nil {
		log.Printf("\u001B[0;31m[Config]: config file initialize failed %v\033[0m", err.Error())
		return err
	} else {
		err := viper.Unmarshal(&Config)
		if err != nil {
			log.Printf("\u001B[0;31m[Config]: config file initialize failed %v\033[0m", err.Error())
			return err
		}
		log.Print("\u001B[0;32m[Config]: config file initialize success\033[0m")
		return nil
	}
}

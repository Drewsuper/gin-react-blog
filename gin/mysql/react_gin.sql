/*
 Navicat Premium Data Transfer

 Source Server         : 8.130.78.9
 Source Server Type    : MySQL
 Source Server Version : 80100
 Source Host           : 8.130.78.9:9906
 Source Schema         : react_gin

 Target Server Type    : MySQL
 Target Server Version : 80100
 File Encoding         : 65001

 Date: 27/04/2024 14:13:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog_classes
-- ----------------------------
DROP TABLE IF EXISTS `blog_classes`;
CREATE TABLE `blog_classes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `real_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `view_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_classes
-- ----------------------------
INSERT INTO `blog_classes` VALUES (4, '测试', '系统测试1', '2024-01-23 00:00:00', '2024-04-23 13:02:40');
INSERT INTO `blog_classes` VALUES (5, '系统测试12', '系统测试123', '2024-02-12 12:22:36', '2024-02-12 12:22:36');
INSERT INTO `blog_classes` VALUES (6, '系统测试_test', '系统测试_test', '2024-04-23 13:27:24', '2024-04-23 13:27:24');
INSERT INTO `blog_classes` VALUES (8, '系统测试_test123', '系统测试_test12', '2024-04-23 13:31:49', '2024-04-23 13:31:57');

-- ----------------------------
-- Table structure for blog_contents
-- ----------------------------
DROP TABLE IF EXISTS `blog_contents`;
CREATE TABLE `blog_contents`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `class_id` int NOT NULL,
  `tags_id` int NOT NULL,
  `des` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `classes_content`(`class_id` ASC) USING BTREE,
  INDEX `tags_contents`(`tags_id` ASC) USING BTREE,
  CONSTRAINT `classes_content` FOREIGN KEY (`class_id`) REFERENCES `blog_classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tags_contents` FOREIGN KEY (`tags_id`) REFERENCES `blog_tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_contents
-- ----------------------------

-- ----------------------------
-- Table structure for blog_links
-- ----------------------------
DROP TABLE IF EXISTS `blog_links`;
CREATE TABLE `blog_links`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `link_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `link_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_links
-- ----------------------------

-- ----------------------------
-- Table structure for blog_reply
-- ----------------------------
DROP TABLE IF EXISTS `blog_reply`;
CREATE TABLE `blog_reply`  (
  `id` int NOT NULL,
  `blog_id` int NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `reply_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `content_reply`(`blog_id` ASC) USING BTREE,
  INDEX `reply_reply`(`reply_id` ASC) USING BTREE,
  CONSTRAINT `content_reply` FOREIGN KEY (`blog_id`) REFERENCES `blog_contents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reply_reply` FOREIGN KEY (`reply_id`) REFERENCES `blog_reply` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_reply
-- ----------------------------

-- ----------------------------
-- Table structure for blog_tags
-- ----------------------------
DROP TABLE IF EXISTS `blog_tags`;
CREATE TABLE `blog_tags`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `real_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `view_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `up_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `class_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `classes_tags`(`class_id` ASC) USING BTREE,
  CONSTRAINT `classes_tags` FOREIGN KEY (`class_id`) REFERENCES `blog_classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_tags
-- ----------------------------
INSERT INTO `blog_tags` VALUES (5, '系统测试12', '系统测试123', '2024-02-12 12:39:04', '2024-02-12 12:39:04', 4);

-- ----------------------------
-- Table structure for blog_user
-- ----------------------------
DROP TABLE IF EXISTS `blog_user`;
CREATE TABLE `blog_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `pwd` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_user
-- ----------------------------
INSERT INTO `blog_user` VALUES (1, 'lh', 'lh201807');

-- ----------------------------
-- View structure for blog_tags_class_count
-- ----------------------------
DROP VIEW IF EXISTS `blog_tags_class_count`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `blog_tags_class_count` AS select `tag`.`class_id` AS `class_id`,`class`.`view_name` AS `view_name`,`class`.`real_name` AS `real_name`,count(0) AS `num` from (`blog_tags` `tag` join `blog_classes` `class` on((`tag`.`class_id` = `class`.`id`))) group by `tag`.`class_id`;

SET FOREIGN_KEY_CHECKS = 1;

/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : cloudnote

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 14/10/2018 10:50:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `noteid` int(11) NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `filename` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `ext` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `type` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `filepath` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userid`(`userid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mark
-- ----------------------------
DROP TABLE IF EXISTS `mark`;
CREATE TABLE `mark`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NULL DEFAULT NULL,
  `markName` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isStar` tinyint(4) NOT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `isdelete` tinyint(4) NULL DEFAULT 0,
  `notesnum` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userid`(`userid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mark
-- ----------------------------
INSERT INTO `mark` VALUES (1, 1, 'bj', 0, '2018-10-09 21:05:04', '2018-10-09 21:05:04', 0, 0);
INSERT INTO `mark` VALUES (2, 1, '笔记2', 0, '2018-10-09 21:05:38', '2018-10-13 23:37:09', 0, 0);
INSERT INTO `mark` VALUES (3, 1, 'diek', 0, '2018-10-14 09:40:30', '2018-10-14 09:40:30', 0, 0);

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NULL DEFAULT NULL,
  `title` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createtime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updatetime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `markID` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `notebookID` int(11) NULL DEFAULT NULL,
  `remindTime` timestamp(0) NULL DEFAULT NULL,
  `isStar` tinyint(4) NOT NULL,
  `isShare` tinyint(4) NOT NULL,
  `isdelete` tinyint(4) NOT NULL,
  `sharedpeople` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `notebookID`(`notebookID`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of note
-- ----------------------------
INSERT INTO `note` VALUES (1, 1, '笔记1', 'jflkdsj房间都是快乐福建省的快乐金坷垃', '2018-10-06 10:05:08', '2018-10-13 17:49:07', NULL, 1, NULL, 0, 0, 0, '');
INSERT INTO `note` VALUES (2, 2, '笔记2', 'jfds辅导教师小刺猬', '2018-10-06 10:26:30', '2018-10-13 17:49:09', NULL, 1, NULL, 0, 0, 0, NULL);
INSERT INTO `note` VALUES (3, 1, '笔记3', '积分都快累死我', '2018-10-06 10:28:43', '2018-10-11 10:40:48', NULL, 2, NULL, 1, 0, 0, NULL);
INSERT INTO `note` VALUES (4, 1, '笔记4房间都说了卡飞机快乐撒地方建立卡萨丁', 'fjlksdajviocxjioewrmn,x附近的开始来附近开了大三 按实际调查v继续哦附近扫粉底霜', '2018-10-06 19:24:18', '2018-10-13 17:49:12', NULL, 1, NULL, 0, 0, 0, NULL);
INSERT INTO `note` VALUES (5, 1, 'fun', '附近的史莱克', '2018-10-08 00:15:21', '2018-10-11 10:45:31', NULL, 2, NULL, 0, 0, 0, NULL);
INSERT INTO `note` VALUES (6, 1, '123啊', '富士达', '2018-10-08 01:15:51', '2018-10-11 10:45:58', NULL, 1, NULL, 0, 0, 0, NULL);
INSERT INTO `note` VALUES (7, 1, 'fad给对方', '放大热点', '2018-10-11 15:30:14', '2018-10-13 13:30:03', NULL, 1, NULL, 0, 0, 0, NULL);
INSERT INTO `note` VALUES (8, 1, '发送', '风', '2018-10-11 15:30:44', '2018-10-11 15:30:44', NULL, 1, NULL, 1, 1, 0, NULL);
INSERT INTO `note` VALUES (9, 1, '范德萨额', '法尔', '2018-10-11 15:31:09', '2018-10-11 15:31:09', NULL, 1, NULL, 0, 0, 0, NULL);
INSERT INTO `note` VALUES (10, 1, 'fV字形认为dsa', '而且认为人体', '2018-10-11 23:53:22', '2018-10-11 23:53:22', NULL, 1, NULL, 0, 0, 0, NULL);

-- ----------------------------
-- Table structure for notebook
-- ----------------------------
DROP TABLE IF EXISTS `notebook`;
CREATE TABLE `notebook`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `bookName` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isShare` tinyint(4) UNSIGNED NOT NULL,
  `isdelete` tinyint(4) NULL DEFAULT 0,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `isStar` tinyint(4) UNSIGNED NOT NULL,
  `noteNumber` int(11) NOT NULL DEFAULT 0,
  `sharedpeople` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userid`(`userid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notebook
-- ----------------------------
INSERT INTO `notebook` VALUES (1, 1, '笔记本1', 0, 0, '2018-10-06 10:05:00', '2018-10-11 10:45:38', 0, 0, NULL);
INSERT INTO `notebook` VALUES (2, 1, '笔记本2', 0, 0, '2018-10-09 22:44:59', '2018-10-11 00:36:24', 0, 0, '');
INSERT INTO `notebook` VALUES (3, 2, 'fds3', 0, 0, '2018-10-10 09:37:21', '2018-10-10 09:37:21', 0, 0, NULL);
INSERT INTO `notebook` VALUES (4, 1, 'fsda4', 0, 0, '2018-10-10 09:38:17', '2018-10-11 00:36:29', 0, 0, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', 'admin', '2018-10-06 10:02:24');
INSERT INTO `user` VALUES (2, 'euty', 'euty', '2018-10-06 10:02:24');

SET FOREIGN_KEY_CHECKS = 1;

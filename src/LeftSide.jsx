import React, {Component, PropTypes} from 'react';

let recruitItems = [
	{department:'工程研发部门',total:120,children:[
		{position:'Mac 开发工程师',num:9},{position:'IOS App 测试工程师',num:17},
		{position:'Android 远程控制工程师',num:61},{position:'Web 前端工程师',num:31},
		{position:'Android 多媒体软件开发工程师',num:2}
	]},
	{department:'产品设计部门',total:136,children:[
		{position:'网页设计师',num:47},{position:'ID/工业设计师',num:39},
		{position:'视觉设计师/GUI界面设计师',num:42},{position:'平面设计师',num:8}
	]}
];

class Department extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log('items is:',this.props.items);
		return (
			<div></div>
		);
	}
}

export class LeftSide extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="sidebar">
				<p>招聘职位<span>清空</span></p>
				<Department items={recruitItems}/>
			</div>
		);
	}
}

export default LeftSide;

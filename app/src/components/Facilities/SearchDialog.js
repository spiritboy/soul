import * as React from "react";
import {GroupComponent} from "../Group/GroupComponent";
import {api} from "../../services/api";

export class SearchDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {cols: [], searchResult: []};
    }

    render() {
        return (
            <div className="modal fade" id="myModal" tabIndex={-1} role="dialog"
                 aria-labelledby="myModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <GroupComponent groupValue={this.props.group.groupValues[0]}  isSearch={true}/>
                            <div>
                                <button className="icon" onClick={this.search}><i className="fa fa-search"/></button>
                            </div>
                            <table className="table table-responsive-lg">
                                <thead>
                                <tr>
                                    {this.state.cols.map((c) => {
                                        return (
                                            <th key={c}>{c}</th>
                                        )
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.searchResult.map((item, i) => {
                                    return (
                                        <tr className={(item.isSelected ? "active" : "")} key={i}
                                            onClick={() => {
                                                this.rowClicked(item)
                                            }}
                                            onDoubleClick={this.selectRow}>
                                            {this.state.cols.map((col, i) => {
                                                return (
                                                    <td key={i}>{item.data[col]}</td>
                                                )
                                            })}
                                        </tr>

                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">خروج</button>
                            <button type="button" className="btn btn-primary">انتخاب</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    normalizeItem(item, parent, MAINITEM) {
            for (const j in item) {
            if (typeof(item[j]) !== "object") {
                MAINITEM[parent ? parent + '.' + j : j] = item[j];
            }
            else {
                this.normalizeItem(item[j], j, MAINITEM);
            }
        }
    }

    search = () => {
        api.searchMenu(this.props.group, (res) => {
            const searchResultNormalized = [];
            for (const i in res) {
                const mainItem = {};
                this.normalizeItem(res[i], '', mainItem);
                searchResultNormalized.push({isSelected: false, data: mainItem});
            }
            this.setState({searchResult: searchResultNormalized});
            this.calculateColumns();
        })
    };

    calculateColumns() {
        const cols =[];
        if (this.state.searchResult && this.state.searchResult.length > 0) {
            for (const col in this.state.searchResult[0].data) {
                if (col !== "_id" && col !== "isSelected" && col !== "fkId") {
                    cols.push(col);
                }
            }
        }
        this.setState({cols: cols});
    }

    rowClicked = (row) => {
        this.state.searchResult.forEach((value, index) => {
            value.isSelected = false;
        });
        row.isSelected = true;
        this.setState({searchResult: this.state.searchResult});
    }
    selectRow = () => { 
        this.state.searchResult.forEach((value, index) => {
            if (value.isSelected === true) {
                this.props.onSelect(value.data.fkId);
            }
        });
    }

}
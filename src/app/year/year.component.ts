import { Component, OnInit } from '@angular/core';
// import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'underscore';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { CommonService } from '../services/common/common.service';
declare var $: any;
@Component({
    selector: 'app-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {

    search_form: any = [];
    yearList: any = [];
    itemPerPage: number = 10;
    pageNumber: number;
    pager: any = [];
    currentPage: number;
    yearForm: FormGroup;
    formName: string;
    formErrors: any = {};
    page_number: number;
    organization: number;
    status_list: any = [];
    type_list: any = [];
    toMinDate: string = '';
    formSubmit: boolean = true;
    constructor(private cs: CommonService, private auth: AuthService) {
        this.search_form.q = '';
        this.yearForm = new FormGroup({
            id: new FormControl(''),
           
            current_year: new FormControl(0, []),
            from_year: new FormControl('', [Validators.required]),
            to_year: new FormControl('', [Validators.required]),
        });
        this.getYear();
    }
    getYear(pageNumber = 1) {
        // this.spinner.show();
        this.cs.get('/attendance-api/year/?page=' + pageNumber + "&search=" + this.search_form.q).subscribe(
            (data) => {
                this.yearList = data["results"];
                this.pager = this.cs.pageService(data['total_pages'], pageNumber);
                this.currentPage = pageNumber;
                // this.spinner.hide();
            },
            (error) => {
                console.log(error)
                this.cs.checkError(error);
                // this.spinner.hide();
            });
    }
    clearInput(e) {
        this.formErrors = {};
        this.yearForm = new FormGroup({
            id: new FormControl(''),
           
            current_year: new FormControl(0, []),
            from_year: new FormControl('', [Validators.required]),
            to_year: new FormControl('', [Validators.required]),
        });
        this.formName = "Add year";
    }


    yearPost() {
        var datePipe = new DatePipe('en-US');
        // this.spinner.show();
        this.cs.get('/attendance-api/check-year/?year_id=' + this.yearForm.value.id).subscribe(
            (data) => {
                var already = data['already_exit'];
                    if (!already || !this.yearForm.value.current_year) {
                        if (!this.yearForm.value.id) {
                            this.cs.post(this.yearForm.value, '/attendance-api/year/').subscribe(
                                (data) => {
                                    this.getYear(this.page_number);
                                    this.formErrors = {};
                                    $('#year-form').modal('hide');
                                },
                                (error) => {
                                    this.formErrors = error.error;
                                    this.cs.checkError(error);
                                });
                        } else {
                            var single_year = this.yearList.filter(x => x.id === this.yearForm.value.id);
                            this.cs.put(this.yearForm.value, '/attendance-api/year/' + this.yearForm.value.id + '/').subscribe(
                                (data) => {
                                    
                                    single_year[0].current_year = data['current_year'];
                                    
                                    single_year[0].from_year = data['from_year'];
                                    single_year[0].to_year = data['to_year'];
                                    this.formErrors = {};
                                    $('#year-form').modal('hide');
                                },
                                (error) => {
                                    this.formErrors = error.error;
                                    this.cs.checkError(error);
                                });
                        }
                    } else {
                        this.formErrors.current_year = "Current Year already exist!";
                    }
               
            },
            (error) => {
            });



    }
    yearEdit(year) {
        this.formName = "Edit year";
        this.formErrors = {};
        this.yearForm = new FormGroup({
            id: new FormControl(year.id),
           
            current_year: new FormControl(year.current_year, []),
            from_year: new FormControl(year.from_year, [Validators.required]),
            to_year: new FormControl(year.to_year, [Validators.required]),
        });
        // this.toMinDate = this.yearForm.value.from_date
    }
    delYear(year_id) {
        var url = '/attendance-api/year/' + year_id + '/'
        this.cs.delete(url).subscribe((result) => {
            //   var single_employee = this.employeeList.filter(x => x.id === employee.invoice);
            this.getYear();
            // this.spinner.hide();
        }, (error) => {
            if (error.status === 400) {
                // this.formErrors = error.error;
                // this.spinner.hide()
            }
            this.cs.checkError(error);
            // this.spinner.hide()
        });
    }
    deleteYear(year) {
        // this.spinner.show()
        if (confirm("Are you sure to delete ?")) {
            var check_url = '/attendance-api/check-year-del/?year=' + year.id 
            this.cs.get(check_url).subscribe((result) => {
                if (result['is_dependent']) {
                    if (confirm("Year is related with " + result['message'] + " Are you sure to delete ?")) {
                        this.delYear(year.id)
                    }
                    else {
                        // this.spinner.hide()
                    }
                } else {
                    this.delYear(year.id)
                }
            }, (error) => {
                if (error.status === 400) {
                    // this.formErrors = error.error;
                    // this.spinner.hide()
                }
                this.cs.checkError(error);
                // this.spinner.hide()
            });



        }
    }
    clearSearch() {
        this.search_form.q = '';
        this.getYear();
        this.toMinDate = ''
    }
    
    
    setDefaultValue(type_id, field_name, form_name) {
        if (!this[form_name].value[field_name]) {
            this[form_name].controls[field_name].setValue(type_id);
        }
        return 1;
    }
    ngOnInit() {
    }
    onDateChange() {
        // this.minDate = this.search_form.date_from_filter;
        // let to_max= new Date(this.search_form.date_from_filter.getTime());
        // this.toMinDate = new Date(to_max.setDate(this.minDate.getDate() + 35));
        this.toMinDate = this.yearForm.value.from_date

    }

}

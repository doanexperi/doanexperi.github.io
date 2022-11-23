/* Global Variables */

const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const subID = jsPsych.randomization.randomID(8)

var timeline = [];
var jsPsych = initJsPsych();

var fullscreen_trial = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
};

var preload = {
    type: jsPsychPreload,
    auto_preload: true
};

var exp_open_remarks = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: `
            <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
            <b>
            您好！我们是浙江大学管理学院的研究团队，本次实验主要围绕判断与预测开展。接下来实验过程中，需要您做出判断和预测。请放心，您的回复将完全保密。<br/>
            完成本研究大约需要30分钟。请保证您完全自愿参加本次实验，在不损害相关利益的情况下您可以在任何时间出于任何原因退出实验且放弃相关酬金。<br/>
            在了解和同意以上的注意事项后，您将正式进入实验！<br/><br/>
            </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

timeline.push(exp_open_remarks);

var exp_game_task_intro = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: `
            <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
            <b>
            在本实验中，您将模拟进行一项柠檬水经营游戏。具体情境如下：<br/><br/>
            您的角色是某公园柠檬水摊位的摊主，您的主要任务是根据提供的信息预测柠檬水的销量，以便提前准备好相关的制作材料。本次实验分为两大部分，共计完成14次柠檬水的销量预测。<br/><br/>
            在本实验中，您有机会通过更精确的预测获得更多的实验报酬，因此请仔细阅读所有的相关信息。<br/><br/>
            </p>`,
    button_label: '继续实验',
    delay_after: 100
}
timeline.push(exp_game_task_intro);

var exp_interest_intro = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: `
            <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
            <b>
            【酬金规则】：<br/><br/>
            实验酬金分为基本酬金和浮动酬金两部分：<br/>
            ① 基本酬金：完整参与游戏，获得15元。<br/>
            ② 浮动酬金：根据预测销量、实际销量、制作成本、销售价格计算某一次的收益，随机选取某一次的经营收益作为您的浮动酬金。<br/>
            最终酬金=基本酬金+浮动酬金。<br/><br/>

            ——————————————————————————————————————————————<br/><br/>
            酬金计算示例：<br/>
            售价：1元/杯<br/>
            成本：0.2元/杯<br/>
            第一次预测15杯，实际销售13杯，第一次收益：13x1-15x0.2=10元<br/>
            第二次预测15杯，实际需求20杯，第二次收益：15x1-15x0.2=12元<br/>
            随机抽取第二次预测结果作为浮动酬金，则全部的实验酬金为：15+12=27元<br/><br/>
            ——————————————————————————————————————————————<br/><br/>
            </p>`,
    button_label: '已了解酬金规则',
    delay_after: 100
}
timeline.push(exp_interest_intro);

var trial_3 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<p style="color: orange; font-size: 48px; font-weight: bold;">BLUE</p>',
    choices: function() {
        // randomly shuffle the yes/no button order on each trial
        var button_choices = ['Yes', 'No'];
        return jsPsych.randomization.shuffle(button_choices);
    },
    post_trial_gap: function() {
        // randomly select an ITI duration
        return jsPsych.randomization.sampleWithoutReplacement([200, 300, 400, 500], 1)[0];
    },
    prompt: '<p>Does the color match the word?</p><p>Randomized button choice order and post trial gap duration.<br>' +
        'These values will be saved to the data.</p>',
    save_trial_parameters: {
        // save the randomly-selected button order and ITI value to the trial data
        choices: true,
        post_trial_gap: true
    },
    on_finish: function(data) {
        // determine which button was pressed, based on the response (button index: 0 or 1) and choices array (randomized order of button labels)
        data.response_button_label = data.choices[data.response];
    }
}
timeline.push(trial_3);

var exp_interest_test = {
    type: jsPsychSurveyText,
    data: {
        varname: 'exp_interest_test'
    },
    preamble: '为了让您更清楚本实验的酬金发放规则，请您在5分钟之内计算以下游戏表现对应的最终酬金。（可使用提供的纸和笔）',
    questions: [{
        prompt: '1.售价1元/杯，制作成本0.25元/杯，制作30杯，实际需求40杯，当天净收益为多少元？',

        required: true
    }, {
        prompt: '2.售价1元/杯，制作成本0.20元/杯，预计制作20杯，实际销售20杯，当天净收益为多少元？',

        required: true
    }, {
        prompt: '3.售价1元/杯，制作成本0.3元/杯，预计制作25杯，实际销售20杯，当天净收益为多少元？',

        required: true
    }],
    button_label: '确认提交',
}
timeline.push(exp_interest_test);

var exp_rule_intro = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: `
            <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
            <b>
            【游戏要点】：<br/><br/>
            作为经营类游戏，您的主要职责是根据4项相关信息预测相应的柠檬水销量。4项相关信息的介绍如下：<br/>
            ① 星期：周一到周日。<br/>
            ② 气温：摄氏度，根据天气预报得到。<br/>
            ③ 降水量：单位毫升，根据天气预报得到。<br/>
            ④ 制作传单数：当天制作的传单数量（传单的制作和发放成本暂时不考虑）。<br/><br/>

            根据公园的相关规定和市场行情，以下信息在短期内（11月份）不会发生变化：<br/>
            ① 柠檬水售价：1 元/杯。<br/>
            ② 制作成本：0.4元/杯。<br/><br/>
            </p>`,
    button_label: '进入游戏',
    delay_after: 100
}
timeline.push(exp_rule_intro);

var exp_predict_1 = {
    type: jsPsychSurveyText,
    preamble: `
            <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
            <b>
            【DAY 1】<br/><br/>
            请您根据以下信息预测柠檬水销量（售价1元/杯，成本0.4元/杯）：<br/>
            ① 星期：星期三<br/>
            ② 气温：11°C<br/>
            ③ 降水量：0.83ml<br/>
            ④ 制作传单数：43张<br/><br/>
            </p>
            `,
    questions: [{
        prompt: '您预计制作多少杯柠檬水？',
        required: true
    }],
    button_label: '确认提交',
    on_finish: function(data) {
        var pre = data.responses.json()
        var res = JSON.parse(pre).Q0
        data.selfpred1 = res
    }

}
timeline.push(exp_predict_1);

var scale = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

var exp_predict_confi_1 = {
    type: jsPsychSurveyLikert,
    questions: [{
        prompt: "您对自己的预测结果有多大信心？",
        name: 'confidence_1',
        labels: scale,
        required: true
    }],
    button_label: '确认提交'
}
timeline.push(exp_predict_confi_1);

var exp_predict_result_1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        jsPsych.data.displayData();



    }
}

jsPsych.run(timeline);
function setNativeValue(element, value) {
    var element = document.getElementById('contactPerson')
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else {
        valueSetter.call(element, value);
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
}
// var name = document.getElementById('contactPerson')
setNativeValue('foo');
// name.dispatchEvent(new Event('input', { bubbles: true }));


